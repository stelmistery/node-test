CREATE TABLE authors
(
    id       integer primary key,
    fullname varchar(255) NOT NULL
);

CREATE TABLE books (
    id          integer NOT NULL,
    date        date    NOT NULL,
    title       varchar(255) NOT NULL,
    author_id   integer      NOT NULL,
    description varchar(255),
    image       varchar(100),
    PRIMARY KEY (id),
    FOREIGN KEY (author_id) REFERENCES authors(id)
);


INSERT INTO authors (fullname)
VALUES ('Arianna Fuentes'),
       ('Jerry Kirk'),
       ('Mathias Mccullough'),
       ('Danny Campos');

INSERT INTO books(date, title, author_id, description, image)
VALUES ('Easy Python', CURRENT_TIMESTAMP, 1, 'Lorem ipsum dolor sit amet.', '/path/to/image'),
       ('Learn Javascript', CURRENT_TIMESTAMP, 2, 'Lorem ipsum dolor sit amet.', '/path/to/javascript'),
       ('Math', CURRENT_TIMESTAMP, 3, 'Lorem ipsum dolor sit amet.', '/path/to/math'),
       ('C++ in 21 days', CURRENT_TIMESTAMP, 4, 'Lorem ipsum dolor sit amet.', '/path/to/cplusplus');