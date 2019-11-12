const {
  Pool,
} = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DB_URL,
});

pool.on('connect', () => {
  console.log('connected to the db');
});

const createTables = () => {
  const table = `
  DROP TABLE IF EXISTS users CASCADE;
  
  CREATE TABLE IF NOT EXISTS users( 
    userid VARCHAR (50) PRIMARY KEY, 
    firstname VARCHAR (50) NOT null, 
    lastname VARCHAR (50) NOT null, 
    email VARCHAR (60) UNIQUE NOT NULL,
    password VARCHAR (255) NOT NULL, 
    gender VARCHAR (8) NOT null, 
    department VARCHAR (25) NOT NULL,
    address TEXT NOT NULL, 
    jobrole VARCHAR (25) NOT NULL,
    usertype VARCHAR (8) NOT NULL
    );
    
  DROP TABLE IF EXISTS articles CASCADE;

  CREATE TABLE IF NOT EXISTS articles(
    articleid VARCHAR (50) PRIMARY KEY,
    title VARCHAR (200) NOT NULL, 
    message TEXT NOT null, 
    createdOn TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, 
    owner VARCHAR (50) NOT NULL
    );

  DROP TABLE IF EXISTS gifs CASCADE;

  CREATE TABLE IF NOT EXISTS gifs(
    gifid VARCHAR (50) PRIMARY KEY,
    title VARCHAR (200) NOT NULL, 
    imageUrl VARCHAR (255) NOT null, 
    createdOn TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, 
    owner VARCHAR (50) NOT NULL
    );

  DROP TABLE IF EXISTS articlecomments CASCADE;

  CREATE TABLE IF NOT EXISTS articlecomments(
    commentid VARCHAR (50) PRIMARY KEY,
    articleid VARCHAR (50) NOT NULL,
    comment TEXT NOT null, 
    createdOn TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, 
    owner VARCHAR (50) NOT NULL
    );

  DROP TABLE IF EXISTS gifcomments CASCADE;

  CREATE TABLE IF NOT EXISTS gifcomments(
    commentid VARCHAR (50) PRIMARY KEY,
    gifid VARCHAR (50) NOT NULL,
    comment TEXT NOT null, 
    createdOn TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, 
    owner VARCHAR (50) NOT NULL
    );
    `;

  pool
    .query(table)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

createTables();
