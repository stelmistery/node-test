CREATE TABLE library.authors
(
    id       integer auto_increment primary key,
    fullname varchar(255) NOT NULL
);

CREATE TABLE library.books
(
    id          integer auto_increment primary key,
    title       varchar(255) NOT NULL,
    author_id   integer      NOT NULL,
    description varchar(255),
    date        datetime,
    image       varchar(100),
    FOREIGN KEY (author_id) REFERENCES library.authors (id)
);

INSERT INTO library.authors (id, fullname)
VALUES (1, 'Arianna Fuentes'),
       (2, 'Jerry Kirk'),
       (3, 'Mathias Mccullough'),
       (4, 'Danny Campos');

INSERT INTO library.books(id, title, author_id, description, date, image)
VALUES (1, 'Easy Python', 1, 'Lorem ipsum dolor sit amet.', now(), '/path/to/image'),
       (2, 'Learn Javascript', 2, 'Lorem ipsum dolor sit amet.', now(), '/path/to/javascript'),
       (3, 'Math', 3, 'Lorem ipsum dolor sit amet.', now(), '/path/to/math'),
       (4, 'C++ in 21 days', 4, 'Lorem ipsum dolor sit amet.', now(), '/path/to/cplusplus');

