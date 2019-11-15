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

const anonymous = {
  email: 'adesuwageorge@gmail.com',
  password: 'password',
};
// Article
const articleId = '1ec9a90e-dd68-4171-9c4c-e00ca0da5be3';
const categoryName = 'politics';

// Create articles
describe('create articles', () => {
  it('should create an article if a user is signed in', async () => {
    const article = {
      title: 'George again ?',
      message: 'Here we go again. Public speaking et al',
      category: 'politics',
    };
    const loginResponse = await server.post('/api/v1/auth/signin').send(user);
    const {
      token,
    } = loginResponse.body.data;
    const response = await server
      .post('/api/v1/articles/')
      .send(article)
      .set('authorization', `Bearer ${token}`);
    expect(response.status).to.equal(201);
    expect(response.body.data).to.be.an('object');
  });
});

describe('create articles', () => {
  it('should not create an article if the user is not signed in', async () => {
    const article = {
      title: 'George again ?',
      message: 'Here we go again. Public speaking et al',
      category: 'politics',
    };
    const token = ' ';
    const response = await server
      .post('/api/v1/articles/')
      .set('authorization', `Bearer ${token}`)
      .send(article);
    expect(response.status).to.equal(403);
    expect(response.body.error).to.equal('No token provided. ');
  });
});

describe('create articles', () => {
  it('should not create an article if the title field is empty', async () => {
    const article = {
      title: '',
      message: 'Here we go again. Public speaking et al',
      category: 'politics',
    };
    const loginResponse = await server.post('/api/v1/auth/signin').send(user);
    const {
      token,
    } = loginResponse.body.data;
    const response = await server
      .post('/api/v1/articles/')
      .send(article)
      .set('authorization', `Bearer ${token}`);
    expect(response.body.status).to.equal(400);
    expect(response.body.error).to.equal('An article title is required');
  });
});

describe('create articles', () => {
  it('should not create an article if the message field is empty', async () => {
    const article = {
      title: 'George Again',
      message: '',
      category: 'politics',
    };
    const loginResponse = await server.post('/api/v1/auth/signin').send(user);
    const {
      token,
    } = loginResponse.body.data;
    const response = await server
      .post('/api/v1/articles/')
      .send(article)
      .set('authorization', `Bearer ${token}`);
    expect(response.body.status).to.equal(400);
    expect(response.body.error).to.equal('An article message is required');
  });
});

describe('create articles', () => {
  it('should not create an article if the category field is empty', async () => {
    const article = {
      title: 'George Again',
      message: 'Politics and lies',
      category: '',
    };
    const loginResponse = await server.post('/api/v1/auth/signin').send(user);
    const {
      token,
    } = loginResponse.body.data;
    const response = await server
      .post('/api/v1/articles/')
      .send(article)
      .set('authorization', `Bearer ${token}`);
    expect(response.body.status).to.equal(400);
    expect(response.body.error).to.equal('A category is required');
  });
});

// Get articles
describe('Get an article by its id', () => {
  it('should get an article if signed in ', async () => {
    const loginResponse = await server.post('/api/v1/auth/signin').send(user);
    const {
      token,
    } = loginResponse.body.data;

    const response = await server
      .get(`/api/v1/articles/${articleId}`)
      .set('authorization', `Bearer ${token}`);
    expect(response.status).to.equal(200);
    expect(response.body.status).to.equal('success');
    expect(response.body.data).to.be.an('Object');
  });
});

describe('Get an article by its id', () => {
  it('should not get an article if not signed in ', async () => {
    const token = '';

    const response = await server
      .get(`/api/v1/articles/${articleId}`)
      .set('authorization', `Bearer ${token}`);
    expect(response.status).to.equal(403);
    expect(response.body.error).to.equal('No token provided. ');
  });
});


// Get articles by category
describe('Get articles by category', () => {
  it('should get an array of articles if signed in ', async () => {
    const loginResponse = await server.post('/api/v1/auth/signin').send(user);
    const {
      token,
    } = loginResponse.body.data;

    const response = await server
      .get(`/api/v1/category/${categoryName}`)
      .set('authorization', `Bearer ${token}`);
    expect(response.status).to.equal(200);
    expect(response.body.status).to.equal('success');
    expect(response.body.data).to.be.an('array');
  });
});

describe('Get articles by category', () => {
  it('should not get articles if not signed in ', async () => {
    const token = '';

    const response = await server
      .get(`/api/v1/category/${categoryName}`)
      .set('authorization', `Bearer ${token}`);
    expect(response.status).to.equal(403);
    expect(response.body.error).to.equal('No token provided. ');
  });
});

// Update an article

describe('Update an article', () => {
  it('should be able to update an article if signed in ', async () => {
    const loginResponse = await server.post('/api/v1/auth/signin').send(user);
    const {
      token,
    } = loginResponse.body.data;

    const article = {
      title: 'George Not again',
      message: 'Chwckk we go again. Public speaking et al',
      category: 'politics',
    };

    const response = await server
      .patch(`/api/v1/articles/${articleId}`)
      .set('authorization', `Bearer ${token}`)
      .send(article);
    expect(response.status).to.equal(200);
    expect(response.body.status).to.equal('success');
    expect(response.body.data).to.be.an('Object');
  });
});

describe('Update an article', () => {
  it('should not be able to update another user article ', async () => {
    const loginResponse = await server.post('/api/v1/auth/signin').send(anonymous);
    const {
      token,
    } = loginResponse.body.data;

    const article = {
      title: 'George Not again',
      message: 'Chwckk we go again. Public speaking et al',
      category: 'politics',
    };

    const response = await server
      .patch(`/api/v1/articles/${articleId}`)
      .set('authorization', `Bearer ${token}`)
      .send(article);
    expect(response.status).to.equal(403);
    expect(response.body.message).to.equal('This article was not created by you');
  });
});

describe('Update an article', () => {
  it('should not be able to update a non existent article', async () => {
    const loginResponse = await server.post('/api/v1/auth/signin').send(user);
    const {
      token,
    } = loginResponse.body.data;

    const article = {
      title: 'George Not again',
      message: 'Chwckk we go again. Public speaking et al',
      category: 'politics',
    };

    const response = await server
      .patch('/api/v1/articles/6f3f2422-5394-41e2-a1ba-1a62d16bfc59')
      .set('authorization', `Bearer ${token}`)
      .send(article);
    expect(response.status).to.equal(404);
    expect(response.body.message).to.equal('article not found');
  });
});

// Delete article

describe('Delete an article', () => {
  it('should be able to delete an article when signed in', async () => {
    const loginResponse = await server.post('/api/v1/auth/signin').send(user);
    const {
      token,
    } = loginResponse.body.data;

    const response = await server
      .delete(`/api/v1/articles/${articleId}`)
      .set('authorization', `Bearer ${token}`);
    expect(response.status).to.equal(200);
    expect(response.body.data.message).to.equal('article successfully deleted');
  });
});

describe('Delete an article', () => {
  it('should not be able to delete a non existent article', async () => {
    const loginResponse = await server.post('/api/v1/auth/signin').send(user);
    const {
      token,
    } = loginResponse.body.data;

    const response = await server
      .delete(`/api/v1/articles/${articleId}`)
      .set('authorization', `Bearer ${token}`);
    expect(response.status).to.equal(404);
    expect(response.body.message).to.equal('article was not found');
  });
});


describe('Delete an article', () => {
  it('should not be able to delete an article if not signed in', async () => {
    const token = '';

    const response = await server
      .delete(`/api/v1/articles/${articleId}`)
      .set('authorization', `Bearer ${token}`);
    expect(response.status).to.equal(403);
    expect(response.body.error).to.equal('No token provided. ');
  });
});
