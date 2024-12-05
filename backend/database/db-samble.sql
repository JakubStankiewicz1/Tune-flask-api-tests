INSERT INTO genres (genre_name, about) VALUES
('Rock', 'A genre of popular music that originated as "rock and roll" in the United States in the late 1940s and early 1950s.'),
('Pop', 'A genre of popular music that originated in its modern form during the mid-1950s in the United States and the United Kingdom.'),
('Jazz', 'A music genre that originated in the African-American communities of New Orleans, United States.'),
('Classical', 'Art music produced or rooted in the traditions of Western culture.');

INSERT INTO subgenres (genre_id, subgenre_id) VALUES
(1, 2),
(1, 3),
(2, 4);

INSERT INTO artists (artist_name, picture_fname, about) VALUES
('The Beatles', 'artist1.jpg', 'An English rock band formed in Liverpool in 1960.'),
('Elvis Presley', 'artist1.jpg', 'An American singer and actor.'),
('Miles Davis', 'artist1.jpg', 'An American jazz trumpeter, bandleader, and composer.');

INSERT INTO releases (release_name, release_type, release_date, cover_fname, artist_id) VALUES
('Abbey Road', 'album', '1969-09-26', 'cover1.jpg', 1),
('Blue Hawaii', 'album', '1961-10-20', 'cover1.jpg', 2),
('Kind of Blue', 'album', '1959-08-17', 'cover1.jpg', 3);

INSERT INTO songs (title, artist_id, release_id, audio_fname) VALUES
('Come Together', 1, 1, 'song1.mp3'),
('Cant Help Falling in Love', 2, 2, 'song2.mp3'),
('So What', 3, 3, 'song3.mp3');

INSERT INTO artists_genres (artist_id, genre_id) VALUES
(1, 1),
(2, 1),
(3, 3);

INSERT INTO releases_genres (release_id, genre_id) VALUES
(1, 1),
(2, 1),
(3, 3);

INSERT INTO tags (tag_name) VALUES
('Classic'),
('Hit'),
('Live');

INSERT INTO songs_tags (song_id, tag_id) VALUES
(1, 1),
(2, 2),
(3, 3);

INSERT INTO users (email, username, pass_hash) VALUES
('john.doe@example.com', 'johndoe', 'hashedpassword1'),
('jane.doe@example.com', 'janedoe', 'hashedpassword2');

INSERT INTO users_liked_songs (user_id, song_id) VALUES
(1, 1),
(2, 2);

INSERT INTO users_liked_releases (user_id, release_id) VALUES
(1, 1),
(2, 2);

INSERT INTO users_liked_artists (user_id, artist_id) VALUES
(1, 1),
(2, 2);

INSERT INTO users_tags (user_id, tag_id, amount) VALUES
(1, 1, 5),
(2, 2, 3);

INSERT INTO users_genres (user_id, genre_id, amount) VALUES
(1, 1, 10),
(2, 2, 7);

INSERT INTO playlists (playlist_name, owner_id, pl_cover_fname) VALUES
('My Rock Playlist', 1, 'pl_cover1.jpg'),
('Chill Vibes', 2, 'pl_cover1.jpg');

INSERT INTO playlists_songs (playlist_id, song_id) VALUES
(1, 1),
(2, 2);