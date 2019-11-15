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
      '6f3f2422-5394-41e2-a1ba-1a62d16bfc59',
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
        '65863249-4600-4dd6-b601-7e1947b51bc8',
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
        'ee03e6c4-7402-4ddf-84d8-e971d74ee152',
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
      '1ec9a90e-dd68-4171-9c4c-e00ca0da5be3',
      'Market Survey',
      'A lot has been said on the current state of things',
      'politics',
      '6f3f2422-5394-41e2-a1ba-1a62d16bfc59'
      ),
      (
        '99586612-b7d3-48dc-8831-2405b1766600',
        'Tech report',
        'But then we move on to greater things',
        'politics',
        '6f3f2422-5394-41e2-a1ba-1a62d16bfc59'
      ),
      (
        '14fc2435-10c7-48ac-b046-67da4bb0f1ee',
        'Tech blazing',
        'Breaking doors and boundaries',
        'health',
        '65863249-4600-4dd6-b601-7e1947b51bc8'
      );

  TRUNCATE gifs;
  INSERT INTO gifs(
    gifid,
    title,
    imageurl,
    owner
    ) 
    VALUES (
      '80987064-d7b0-470b-ab9c-6d9954060fdf',
      'Bomboclat',
      'https://res.cloudinary.com/fego/image/upload/v1570621104/chef-folio/photo-1482049016688-2d3e1b311543_brscij.jpg',
      '6f3f2422-5394-41e2-a1ba-1a62d16bfc59'
      ),
      (
        '78853b1d-38fd-4297-ab70-48545e091d0b',
        'Scopatumanna',
        'https://res.cloudinary.com/fego/image/upload/v1570623975/chef-folio/photo-1447078806655-40579c2520d6_kvxsec.jpg',
        '6f3f2422-5394-41e2-a1ba-1a62d16bfc59'
      ),
      (
        'c389140c-6bce-4001-a29c-7fd69d9c45d0',
        'Ojewa kwamg',
        'https://res.cloudinary.com/fego/image/upload/v1571830495/hng/sharing_1_au3jr5.png',
        '65863249-4600-4dd6-b601-7e1947b51bc8'
      );

  TRUNCATE articlecomments;
  INSERT INTO articlecomments(
    commentid,
    articleid,
    comment,
    owner
    ) 
    VALUES (
      '3e161db5-4f56-4dd1-86c0-46414f86c334',
      '1ec9a90e-dd68-4171-9c4c-e00ca0da5be3',
      'So I am bored shitless and I have to pen this',
      '6f3f2422-5394-41e2-a1ba-1a62d16bfc59'
      ),
      (
        'ebaf7f57-38cb-47d6-84c0-c410c79cb450',
        '1ec9a90e-dd68-4171-9c4c-e00ca0da5be3',
        'Nas is like freedom or jail, clips inserted. A man is being born same time a man is murdered',
        '6f3f2422-5394-41e2-a1ba-1a62d16bfc59'
      ),
      (
        'bd801312-26f6-4c18-b408-7915c706c655',
        '1ec9a90e-dd68-4171-9c4c-e00ca0da5be3',
        'It aint hard to tell, my poetry is deep. Nas raps should be left in a cell',
        '65863249-4600-4dd6-b601-7e1947b51bc8'
      );

  TRUNCATE gifcomments;
  INSERT INTO gifcomments(
    commentid,
    gifid,
    comment,
    owner
    ) 
    VALUES (
      '058a0c68-4745-4613-b37e-7099948adeb0',
      '80987064-d7b0-470b-ab9c-6d9954060fdf',
      'So I am bored shitless and I have to pen this',
      '6f3f2422-5394-41e2-a1ba-1a62d16bfc59'
      ),
      (
        '7e823740-2ae1-4f5f-9d30-301dccf35647',
        '80987064-d7b0-470b-ab9c-6d9954060fdf',
        'Nas is like freedom or jail, clips inserted. A man is being born same time a man is murdered',
        '6f3f2422-5394-41e2-a1ba-1a62d16bfc59'
      ),
      (
        'cad91c7c-4614-41f0-8695-73e1d9f5afef',
        '80987064-d7b0-470b-ab9c-6d9954060fdf',
        'It aint hard to tell, my poetry is deep. Nas raps should be left in a cell',
        '65863249-4600-4dd6-b601-7e1947b51bc8'
      );
  `;
  pool.query(text)
    .then(() => {
      pool.end();
    });
};

insertAllTables();
