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


const insertAllTables = () => {
  const text = `
  TRUNCATE users;
  INSERT INTO users(
    firstname,
    lastname,
    email,
    password,
    gender,
    department,
    address,
    jobrole,
    usertype
    ) 
    VALUES (
      'Fego',
      'Edafe',
      'feggie@gmail.com',
      '$2b$10$aTDxopZ9dyNDTKbogeQp4.CP4czGuBQqzmpSpkBr0dboEVRgYzMP2',
      'male',
      'marketting',
      'francis Jangbadi Lane Igando',
      'software developer',
      'admin'
      ),
      (
        'Adesuwa',
        'George',
        'adesuwageorge@gmail.com',
        '$2b$10$aTDxopZ9dyNDTKbogeQp4.CP4czGuBQqzmpSpkBr0dboEVRgYzMP2',
        'female',
        'adverts',
        'francis Jangbadi Lane Igando',
        'marketter',
        'employee'
      ),
      (
        'Sai',
        'Tama',
        'saitama@gmail.com',
        '$2b$10$aTDxopZ9dyNDTKbogeQp4.CP4czGuBQqzmpSpkBr0dboEVRgYzMP2',
        'male',
        'human resources',
        'francis Jangbadi Lane Igando',
        'tehnician',
        'employee'
      );
      TRUNCATE articles;
  INSERT INTO articles(
    title,
    message,
    owner
    ) 
    VALUES (
      'Market Survey',
      'A lot has been said on the current state of things',
      '1'
      ),
      (
        'Tech report',
        'But then we move on to greater things',
        '1'
      ),
      (
        'Tech blazing',
        'Breaking doors and boundaries',
        '2'
      );
  `;
  pool.query(text)
    .then(() => {
      pool.end();
    });
};

insertAllTables();
