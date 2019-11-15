const supertest = require('supertest');
const chai = require('chai');
const { describe, it } = require('mocha');

const { expect } = chai;

const app = require('../app');

const server = supertest(app);

// Set token variables
const user = {
  email: 'feggie@gmail.com',
  password: 'password',
};

describe('Get all created articles and GIF posts', () => {
  it('should get all articles and GIF posts if signed in ', async () => {
    const loginResponse = await server.post('/api/v1/auth/signin').send(user);
    const { token } = loginResponse.body.data;

    const response = await server
      .get('/api/v1/feed/')
      .set('authorization', `Bearer ${token}`);
    expect(response.status).to.equal(200);
    expect(response.body.status).to.equal('success');
    expect(response.body.data.feeds).to.be.an('array');
  });
});

describe('Get an article by its id', () => {
  it('should not get all articles and GIF post if not signed in ', async () => {
    const token = '';

    const response = await server
      .get('/api/v1/feed/')
      .set('authorization', `Bearer ${token}`);
    expect(response.status).to.equal(403);
    expect(response.body.error).to.equal('No token provided. ');
  });
});
