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

// IDs
const articleId = '99586612-b7d3-48dc-8831-2405b1766600';
const gifId = '78853b1d-38fd-4297-ab70-48545e091d0b';

// Create article comments
describe('create comments on article posts', () => {
  it('should create a comment if a user is signed in', async () => {
    const comment = {
      comment: 'George again ?',
    };
    const loginResponse = await server.post('/api/v1/auth/signin').send(user);
    const {
      token,
    } = loginResponse.body.data;
    const response = await server
      .post(`/api/v1/articles/${articleId}/comments/`)
      .send(comment)
      .set('authorization', `Bearer ${token}`);
    expect(response.status).to.equal(201);
    expect(response.body.data).to.be.an('object');
  });
});

describe('create comments on article posts', () => {
  it('should not create a comment if the user is not signed in', async () => {
    const comment = {
      comment: 'George again ?',
    };
    const token = ' ';
    const response = await server
      .post(`/api/v1/articles/${articleId}/comments/`)
      .set('authorization', `Bearer ${token}`)
      .send(comment);
    expect(response.status).to.equal(403);
    expect(response.body.error).to.equal('No token provided. ');
  });
});

describe('create comments on article posts', () => {
  it('should not create a comment if the comment field is empty', async () => {
    const comment = {
      comment: '',
    };
    const loginResponse = await server.post('/api/v1/auth/signin').send(user);
    const {
      token,
    } = loginResponse.body.data;
    const response = await server
      .post(`/api/v1/articles/${articleId}/comments/`)
      .send(comment)
      .set('authorization', `Bearer ${token}`);
    expect(response.body.status).to.equal(400);
    expect(response.body.error).to.equal('A comment is required');
  });
});

// Create GIF post comments

describe('create comments on GIF posts', () => {
  it('should create a comment if a user is signed in', async () => {
    const comment = {
      comment: 'George again ?',
    };
    const loginResponse = await server.post('/api/v1/auth/signin').send(user);
    const {
      token,
    } = loginResponse.body.data;
    const response = await server
      .post(`/api/v1/gifs/${gifId}/comments/`)
      .send(comment)
      .set('authorization', `Bearer ${token}`);
    expect(response.status).to.equal(201);
    expect(response.body.data).to.be.an('object');
  });
});

describe('create comments on GIF posts', () => {
  it('should not create a comment if the user is not signed in', async () => {
    const comment = {
      comment: 'George again ?',
    };
    const token = ' ';
    const response = await server
      .post(`/api/v1/gifs/${gifId}/comments/`)
      .set('authorization', `Bearer ${token}`)
      .send(comment);
    expect(response.status).to.equal(403);
    expect(response.body.error).to.equal('No token provided. ');
  });
});
