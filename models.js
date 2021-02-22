import DBPool from '/db'

const db = new DBPool();

class Book {
    constructor(title, date = null, author, description = null, image = null) {
        this.title = title;
        this.date = date;
        this.author = author;
        this.description = description;
        this.image = image;
    }

}