from flask import Flask, request, jsonify, Response, send_file
import mysql.connector
import os
from dotenv import load_dotenv
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash


data_path = f"{os.path.dirname(__file__)}/assets"

load_dotenv(os.path.abspath(os.path.join(os.path.dirname( __file__ ), '..', 'frontend', '.env')))

# Connect the database !!!!!!!!
db = mysql.connector.connect(
    host="localhost",
    user=os.environ.get("DB_USER"),
    password=os.environ.get("DB_PASS"),
    database="tune"
)

# Initialize the Flask app
app = Flask(__name__)

# Allow CORS !!!!!
cors = CORS(app, resources={r"/*": {"origins": "*"}})

# API CHECK
@app.route("/api/check", methods=["GET"])
def check():
    return "I am up and running!", 200


# REGISTER
@app.route("/api/register", methods=["POST"])
def register():
    data = request.get_json()
    email = data.get("email")
    username = data.get("username")
    password = data.get("password")

    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
    user = cursor.fetchone()

    if user:
        cursor.close()
        return jsonify({"message": "Email already registered"}), 400

    pass_hash = generate_password_hash(password)
    cursor.execute("INSERT INTO users (email, username, pass_hash) VALUES (%s, %s, %s)", (email, username, pass_hash))
    db.commit()
    cursor.close()

    return jsonify({"message": "User registered successfully"}), 201


# LOGIN
@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT user_id, pass_hash FROM users WHERE email = %s", (email,))
    user = cursor.fetchone()
    cursor.close()

    if user and check_password_hash(user["pass_hash"], password):
        return jsonify({"message": "Login successful", "user_id": user["user_id"]}), 200
    else:
        return jsonify({"message": "Invalid email or password"}), 401


# SONGS
@app.route("/api/songs/<id>", methods=["GET"])
def get_song(id):
    cursor = db.cursor(dictionary=True)
    cursor.execute(f"""
        SELECT songs.title, songs.artist_id, artists.artist_name 
        FROM songs
        JOIN artists ON songs.artist_id = artists.artist_id
        JOIN releases ON songs.release_id = releases.release_id
        WHERE songs.song_id = {id};""")
    song = cursor.fetchall()
    cursor.close()
    return jsonify(song), 200

@app.route("/api/songs/<id>/cover", methods=["GET"])
def get_song_cover(id):
    cursor = db.cursor(dictionary=True)
    cursor.execute(f"""
        SELECT releases.cover_fname 
        FROM songs
        JOIN releases ON songs.release_id = releases.release_id
        WHERE songs.song_id = {id};""")
    cover_path = cursor.fetchone()["cover_fname"]
    picture = open(f"{data_path}/covers/{cover_path}", "rb").read()
    cursor.close()
    return Response(picture, mimetype="image/jpg")

@app.route("/api/songs/<id>/stream", methods=["GET"])
def streammp3(id):
    cursor = db.cursor(dictionary=True)
    cursor.execute(f"SELECT audio_fname FROM songs WHERE song_id = {id}")
    song = cursor.fetchone()["audio_fname"]
    file_path = f"{data_path}/songs/{song}"
    file_size = os.path.getsize(file_path)
    
    # Sprawdzenie nagłówka Range
    range_header = request.headers.get('Range')
    if range_header:
        # Parsowanie nagłówka Range (np. "bytes=1000-2000")
        byte_range = range_header.split('=')[1]
        start, end = byte_range.split('-')
        start = int(start)
        end = int(end) if end else file_size - 1
        
        # Ustawienie odpowiednich wartości
        length = end - start + 1
        
        # Wczytanie odpowiedniego fragmentu pliku
        with open(file_path, "rb") as file:
            file.seek(start)
            data = file.read(length)
        
        # Utworzenie odpowiedzi z odpowiednimi nagłówkami
        response = Response(data, 206, mimetype="audio/mp3")
        response.headers.add('Content-Range', f'bytes {start}-{end}/{file_size}')
        response.headers.add('Accept-Ranges', 'bytes')
        response.headers.add('Content-Length', str(length))
        return response
    else:
        # Wczytanie całego pliku, jeśli nagłówek Range nie jest obecny
        def generate():
            with open(file_path, "rb") as file:
                data = file.read(1024)
                while data:
                    yield data
                    data = file.read(1024)
        return Response(generate(), mimetype="audio/mp3")

# ARTISTS
@app.route("/api/artists/<id>", methods=["GET"])
def get_artist(id):
    cursor = db.cursor(dictionary=True)
    cursor.execute(f"""
        SELECT artists.artist_name, artists.about, GROUP_CONCAT(genres.genre_name) AS genres
        FROM artists
        JOIN artists_genres ON artists.artist_id = artists_genres.artist_id
        JOIN genres ON artists_genres.genre_id = genres.genre_id
        WHERE artists.artist_id = {id}
        GROUP BY artists.artist_id;""")
    artist = cursor.fetchone()
    cursor.close()
    return jsonify(artist), 200

@app.route("/api/artists/<id>/picture", methods=["GET"])
def get_artist_picture(id):
    cursor = db.cursor(dictionary=True)
    cursor.execute(f"""
        SELECT picture_fname 
        FROM artists 
        WHERE artist_id = {id}""")
    picture = cursor.fetchone()["picture_fname"]
    image = open(f"{data_path}/artists/{picture}", "rb").read()
    cursor.close()
    return Response(image, mimetype="image/jpg")

@app.route("/api/artists/<id>/releases", methods=["GET"])
def get_artist_releases(id):
    cursor = db.cursor(dictionary=True)
    cursor.execute(f"""
        SELECT releases.release_id, releases.release_name, releases.release_type, releases.release_date
        FROM releases
        WHERE releases.artist_id = {id};""")
    releases = cursor.fetchall()
    cursor.close()
    return jsonify(releases), 200


# RELEASES
@app.route("/api/releases/<id>", methods=["GET"])
def get_release(id):
    cursor = db.cursor(dictionary=True)
    cursor.execute(f"""
        SELECT releases.release_name, releases.release_type, releases.release_date, artists.artist_name
        FROM releases
        JOIN artists ON releases.artist_id = artists.artist_id
        WHERE releases.release_id = {id}
        GROUP BY releases.release_id;""")
    release = cursor.fetchone()
    cursor.close()
    return jsonify(release), 200

@app.route("/api/releases/<id>/songs", methods=["GET"])
def get_release_songs(id):
    cursor = db.cursor(dictionary=True)
    cursor.execute(f"""
        SELECT songs.song_id, songs.title
        FROM songs
        WHERE songs.release_id = {id};""")
    songs = cursor.fetchall()
    cursor.close()
    return jsonify(songs), 200

@app.route("/api/releases/<id>/cover", methods=["GET"])
def get_release_cover(id):
    cursor = db.cursor(dictionary=True)
    cursor.execute(f"""
        SELECT cover_fname 
        FROM releases 
        WHERE release_id = {id};""")
    cover_path = cursor.fetchone()["cover_fname"]
    picture = open(f"{data_path}/covers/{cover_path}", "rb").read()
    cursor.close()
    return Response(picture, mimetype="image/jpg")


# PLAYLISTS
@app.route("/api/playlists/<id>", methods=["GET"])
def get_playlist(id):
    cursor = db.cursor(dictionary=True)
    cursor.execute(f"""
        SELECT playlists.playlist_name, playlists.owner_id ,users.username AS owner
        FROM playlists
        JOIN users ON playlists.owner_id = users.user_id
        WHERE playlists.playlist_id = {id}
        GROUP BY playlists.playlist_id;""")
    playlist = cursor.fetchone()
    cursor.close()
    return jsonify(playlist), 200

@app.route("/api/playlists/<id>/songs", methods=["GET"])
def get_playlist_songs(id):
    cursor = db.cursor(dictionary=True)
    cursor.execute(f"""
        SELECT songs.song_id, songs.title
        FROM playlists_songs
        JOIN songs ON playlists_songs.song_id = songs.song_id
        WHERE playlists_songs.playlist_id = {id};""")
    songs = cursor.fetchall()
    cursor.close()
    return jsonify(songs), 200

@app.route("/api/playlists/<id>/cover", methods=["GET"])
def get_playlist_cover(id):
    cursor = db.cursor(dictionary=True)
    cursor.execute(f"""
        SELECT pl_cover_fname 
        FROM playlists 
        WHERE playlist_id = {id};""")
    cover_path = cursor.fetchone()["pl_cover_fname"]
    picture = open(f"{data_path}/playlists/{cover_path}", "rb").read()
    cursor.close()
    return Response(picture, mimetype="image/jpg")


# Run the app
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000 ,debug=True)
