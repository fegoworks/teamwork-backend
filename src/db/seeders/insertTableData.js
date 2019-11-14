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
    userid,
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
      'catastrophe',
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
        'bangasoup',
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
        'talaviro',
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
    articleid,
    title,
    message,
    category,
    owner
    ) 
    VALUES (
      'cacus',
      'Market Survey',
      'A lot has been said on the current state of things',
      'politics',
      'catastrophe'
      ),
      (
        'madluv',
        'Tech report',
        'But then we move on to greater things',
        'politics',
        'catastrophe'
      ),
      (
        'dungeon',
        'Tech blazing',
        'Breaking doors and boundaries',
        'health',
        'bangasoup'
      );

  TRUNCATE gifs;
  INSERT INTO gifs(
    gifid,
    title,
    imageurl,
    owner
    ) 
    VALUES (
      'delinam',
      'Bomboclat',
      'https://res.cloudinary.com/fego/image/upload/v1570621104/chef-folio/photo-1482049016688-2d3e1b311543_brscij.jpg',
      'catastrophe'
      ),
      (
        'detriment',
        'Scopatumanna',
        'https://res.cloudinary.com/fego/image/upload/v1570623975/chef-folio/photo-1447078806655-40579c2520d6_kvxsec.jpg',
        'catastrophe'
      ),
      (
        'ghehsdjh',
        'Ojewa kwamg',
        'https://res.cloudinary.com/fego/image/upload/v1571830495/hng/sharing_1_au3jr5.png',
        'bangasoup'
      );

  TRUNCATE articlecomments;
  INSERT INTO articlecomments(
    commentid,
    articleid,
    comment,
    owner
    ) 
    VALUES (
      'jigsaw',
      'dungeon',
      'So I am bored shitless and I have to pen this',
      'catastrophe'
      ),
      (
        'threebats',
        'dungeon',
        'Nas is like freedom or jail, clips inserted. A man is being born same time a man is murdered',
        'catastrophe'
      ),
      (
        'herewego',
        'dungeon',
        'It aint hard to tell, my poetry is deep. Nas raps should be left in a cell',
        'bangasoup'
      );

  TRUNCATE gifcomments;
  INSERT INTO gifcomments(
    commentid,
    gifid,
    comment,
    owner
    ) 
    VALUES (
      'jigsaw',
      'delinam',
      'So I am bored shitless and I have to pen this',
      'catastrophe'
      ),
      (
        'threebats',
        'delinam',
        'Nas is like freedom or jail, clips inserted. A man is being born same time a man is murdered',
        'catastrophe'
      ),
      (
        'herewego',
        'delinam',
        'It aint hard to tell, my poetry is deep. Nas raps should be left in a cell',
        'bangasoup'
      );
  `;
  pool.query(text)
    .then(() => {
      pool.end();
    });
};

insertAllTables();
