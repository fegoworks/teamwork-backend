const fs = require('fs');
const supertest = require('supertest');
const chai = require('chai');
const {
  describe,
  it,
} = require('mocha');

const {
  expect,
} = chai;

const app = require('../app');

const server = supertest(app);

// Set token variables
const user = {
  email: 'feggie@gmail.com',
  password: 'password',
};

// Gif
const gifId = '80987064-d7b0-470b-ab9c-6d9954060fdf';

// Create gifs
describe('create gifs', () => {
  it('should create a gif if a user is signed in', async () => {
    const loginResponse = await server.post('/api/v1/auth/signin').send(user);
    const {
      token,
    } = loginResponse.body.data;
    const response = await server
      .post('/api/v1/gifs/')
      .set('authorization', `Bearer ${token}`)
      .field('title', 'Here we go')
      .attach(
        'image',
        fs.readFileSync('/Users/Fego/Downloads/feggie.jpg'),
        'testimage.gif',
      );
    expect(response.status).to.equal(200);
    expect(response.body.data).to.be.an('Object');
    expect(response.body.data.message).to.equal(
      'GIF image successfully posted',
    );
  });
});

describe('create gifs', () => {
  it('should not create gif if the user is not signed in', async () => {
    const token = ' ';
    const response = await server
      .post('/api/v1/gifs/')
      .set('authorization', `Bearer ${token}`)
      .field('title', 'Here we go')
      .attach(
        'image',
        fs.readFileSync('/Users/Fego/Downloads/feggie.jpg'),
        'testimage.gif',
      );
    expect(response.status).to.equal(403);
    expect(response.body.error).to.equal('No token provided. ');
  });
});

// Get gifs
describe('Get gif by its id', () => {
  it('should get gif if signed in ', async () => {
    const loginResponse = await server.post('/api/v1/auth/signin').send(user);
    const {
      token,
    } = loginResponse.body.data;

    const response = await server
      .get(`/api/v1/gifs/${gifId}`)
      .set('authorization', `Bearer ${token}`);
    expect(response.status).to.equal(200);
    expect(response.body.status).to.equal('success');
    expect(response.body.data).to.be.an('Object');
  });
});

describe('Get gif by its id', () => {
  it('should not get gif if not signed in ', async () => {
    const token = '';

    const response = await server
      .get(`/api/v1/gifs/${gifId}`)
      .set('authorization', `Bearer ${token}`);
    expect(response.status).to.equal(403);
    expect(response.body.error).to.equal('No token provided. ');
  });
});


// // Delete gif

describe('Delete GIF post', () => {
  it('should be able to delete gif post when signed in', async () => {
    const loginResponse = await server.post('/api/v1/auth/signin').send(user);
    const {
      token,
    } = loginResponse.body.data;

    const response = await server
      .delete(`/api/v1/gifs/${gifId}`)
      .set('authorization', `Bearer ${token}`);
    expect(response.status).to.equal(200);
    expect(response.body.data.message).to.equal('GIF post successfully deleted');
  });
});

describe('Delete Gif post', () => {
  it('should not be able to delete a non existent gif', async () => {
    const loginResponse = await server.post('/api/v1/auth/signin').send(user);
    const {
      token,
    } = loginResponse.body.data;

    const response = await server
      .delete(`/api/v1/gifs/${gifId}`)
      .set('authorization', `Bearer ${token}`);
    expect(response.status).to.equal(404);
    expect(response.body.message).to.equal('GIF post was not found');
  });
});

describe('Delete Gif post', () => {
  it('should not be able to delete gif post if not signed in', async () => {
    const token = '';

    const response = await server
      .delete(`/api/v1/gifs/${gifId}`)
      .set('authorization', `Bearer ${token}`);
    expect(response.status).to.equal(403);
    expect(response.body.error).to.equal('No token provided. ');
  });
});
