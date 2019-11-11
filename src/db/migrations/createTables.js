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
    userid SERIAL PRIMARY KEY, 
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
    articleid SERIAL PRIMARY KEY,
    title VARCHAR (100) NOT NULL, 
    message TEXT NOT null, 
    createdOn TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, 
    owner INT NOT NULL
    );

  DROP TABLE IF EXISTS gifs CASCADE;

  CREATE TABLE IF NOT EXISTS gifs(
    gifid SERIAL PRIMARY KEY,
    title VARCHAR (100) NOT NULL, 
    imageUrl TEXT NOT null, 
    createdOn TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, 
    owner INT NOT NULL
    );
    `;

  pool.query(table)
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
