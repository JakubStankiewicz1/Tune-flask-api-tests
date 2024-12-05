DROP DATABASE IF EXISTS tune;
CREATE DATABASE IF NOT EXISTS tune;
USE tune;

CREATE TABLE genres(
    genre_id        INT          NOT NULL AUTO_INCREMENT,
    genre_name      VARCHAR(255) NOT NULL,
    about           TEXT,
    PRIMARY KEY (genre_id)
);

CREATE TABLE subgenres(
    id              INT          NOT NULL AUTO_INCREMENT,
    genre_id        INT          NOT NULL REFERENCES genres(genre_id),
    subgenre_id     INT          NOT NULL REFERENCES genres(genre_id),
    PRIMARY KEY (id)
);

CREATE TABLE artists(
    artist_id       INT NOT NULL AUTO_INCREMENT,
    artist_name     VARCHAR(255) NOT NULL,
    picture_fname   VARCHAR(255) NOT NULL,
    about           TEXT,
    PRIMARY KEY (artist_id)
);

CREATE TABLE releases(
    release_id      INT          NOT NULL AUTO_INCREMENT,
    release_name    VARCHAR(255) NOT NULL,
    release_type    ENUM('album', 'single', 'ep', 'demo', 'live', 'compilation') NOT NULL,
    release_date    DATE         NOT NULL,
    cover_fname     VARCHAR(255) NOT NULL,
    artist_id       INT          NOT NULL REFERENCES artists(artist_id),
    PRIMARY KEY (release_id)
);

CREATE TABLE songs(
    song_id         INT          NOT NULL AUTO_INCREMENT,
    title           VARCHAR(255) NOT NULL,
    artist_id       INT          NOT NULL REFERENCES artists(artist_id),
    release_id      INT          NOT NULL REFERENCES releases(release_id),
    audio_fname     VARCHAR(255) UNIQUE NOT NULL,
    PRIMARY KEY (song_id)    
);

CREATE TABLE artists_genres(
    id              INT          NOT NULL AUTO_INCREMENT,
    artist_id       INT          NOT NULL REFERENCES artists(artist_id),
    genre_id        INT          NOT NULL REFERENCES genres(genre_id),
    PRIMARY KEY (id)
);

CREATE TABLE releases_genres(
    id              INT          NOT NULL AUTO_INCREMENT,
    release_id      INT          NOT NULL REFERENCES releases(release_id),
    genre_id        INT          NOT NULL REFERENCES genres(genre_id),
    PRIMARY KEY (id)
);

CREATE TABLE tags(
    tag_id          INT          NOT NULL AUTO_INCREMENT,
    tag_name        VARCHAR(255) NOT NULL,
    PRIMARY KEY (tag_id)  
);

CREATE TABLE songs_tags(
    id              INT          NOT NULL AUTO_INCREMENT,
    song_id         INT          NOT NULL REFERENCES songs(song_id),
    tag_id          INT          NOT NULL REFERENCES tags(tag_id),
    PRIMARY KEY (id)
);

CREATE TABLE users(
    user_id         INT          NOT NULL AUTO_INCREMENT,
    email           VARCHAR(255) NOT NULL UNIQUE,
    username        VARCHAR(255) NOT NULL,
    pass_hash       VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE users_liked_songs(
    id              INT          NOT NULL AUTO_INCREMENT,
    user_id         INT          NOT NULL REFERENCES users(user_id),
    song_id         INT          NOT NULL REFERENCES songs(song_id),
    PRIMARY KEY (id)
);

CREATE TABLE users_liked_releases(
    id              INT          NOT NULL AUTO_INCREMENT,
    user_id         INT          NOT NULL REFERENCES users(user_id),
    release_id      INT          NOT NULL REFERENCES releases(release_id),
    PRIMARY KEY (id)
);

CREATE TABLE users_liked_artists(
    id              INT          NOT NULL AUTO_INCREMENT,
    user_id         INT          NOT NULL REFERENCES users(user_id),
    artist_id       INT          NOT NULL REFERENCES releases(release_id),
    PRIMARY KEY (id)
);

CREATE TABLE users_tags(
    id              INT          NOT NULL AUTO_INCREMENT,
    user_id         INT          NOT NULL REFERENCES users(user_id),
    tag_id          INT          NOT NULL REFERENCES tags(tag_id),
    amount          INT UNSIGNED NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE users_genres(
    id              INT          NOT NULL AUTO_INCREMENT,
    user_id         INT          NOT NULL REFERENCES users(user_id),
    genre_id        INT          NOT NULL REFERENCES tags(tag_id),
    amount          INT UNSIGNED NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE playlists(
    playlist_id     INT          NOT NULL AUTO_INCREMENT,
    playlist_name   VARCHAR(255) NOT NULL,
    owner_id        INT          NOT NULL REFERENCES users(user_id),
    pl_cover_fname  VARCHAR(255) NOT NULL,
    PRIMARY KEY(playlist_id)
);

CREATE TABLE playlists_songs(
    id              INT          NOT NULL AUTO_INCREMENT,
    playlist_id     INT          NOT NULL REFERENCES playlists(playlist_id),
    song_id         INT          NOT NULL REFERENCES songs(song_id),
    PRIMARY KEY (id)
);