const env = require("dotenv").config();
const mysql = require("mysql2");
const fs = require("fs");
const path = require('path');

class DBPool {
    constructor() {
        this.pool = mysql.createPool({
            multipleStatements: true,
            connectionLimit: 5,
            host: process.env.DB_HOSTNAME,
            user: process.env.DB_USER,
            database: process.env.DB_db,
            password: process.env.DB_PASS,
        });
        this.db_exist_or_create();
    };

    db_exist_or_create() {
        let sql = `SHOW TABLES LIKE '${process.env.DB_db}';`
        this.pool.query(sql, (err, res) => {
            if (err) {
                console.log('Show tables error');
            } else {
                if (res.length !== 0) {
                    console.log('Database exist!')
                } else {
                    console.log('Default database creating...')
                    this.db_default_init();
                }
            }
        });
    };

    db_default_init() {
        // const creates = fs.readFileSync(path.join(__dirname, 'create_db.sql')).toString();
        const creates = fs.readFileSync(path.join(__dirname, 'create_db.sql')).toString();
        console.log(creates);
        const query = this.pool.execute(creates, (err, result) => {
            if (err) {
                throw err;
            } else {
                console.log('Query run successfully')
            }

        });
    };
}

db = new DBPool();