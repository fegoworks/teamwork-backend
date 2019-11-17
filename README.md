# teamwork-backend

[![Coverage Status](https://coveralls.io/repos/github/fegoworks/teamwork-backend/badge.svg)](https://coveralls.io/github/fegoworks/teamwork-backend)
[![Build Status](https://travis-ci.org/fegoworks/teamwork-backend.svg?branch=develop)](https://travis-ci.org/fegoworks/teamwork-backend)

Teamwork is an ​internal social network for employees of an organization. The goal of this application is to facilitate more interaction between colleagues and promote team bonding

## Built With

- Nodejs
- PostgreSQL

## Features

- Employees can
  - Sign in
  - Create articles and GIF posts
  - View articles and GIF posts
  - Edit articles
  - Comment on articles
  - Delete articles and GIF posts
- Admin can
  - Create new employee accounts

## Getting Started

To run teamwork locally simply follow the instructions below:

#### Prerequisites

You need to have or install the following:

1. Git bash
2. Npm
3. Postman

#### Installation

- clone repo
  ```
  git clone https://github.com/fegoworks/teamwork-backend.git
  ```
- navigate to api folder
- run installation
  ```
  npm install
  ```
- create a `.env` file with this template
  ```
  DB_URL='Your postgres database url'
  TEST_URL='Your postgres test database url'
  ```
- start app
  ```
  npm run dev-start
  ```
- you can now make requests using postman to `localhost:4545/api/v1/`

## Running Tests

To run tests simply run the following command in your git bash or command line

```
npm run test
```

### API

Heroku: [teamwork-fg](https://teamwork-fg.herokuapp.com/)
Documentation: [Teamwork-Docs]()

| Endpoints                          | Functionality                   |
| ---------------------------------- | ------------------------------- |
| POST /auth/create-user             | Create new user account         |
| POST /auth/signin                  | Login a user                    |
| POST /articles                     | Create an article               |
| POST /gifs                         | Create a GIF post               |
| PATCH /articles/:articleId         | Edit an article                 |
| DELETE /articles/:articleId        | Delete a specific article       |
| DELETE /gifs/:gifId                | Delete a specific GIF post      |
| POST /articles/:articleId/comments | Comment on a specific article   |
| POST /gifs/:gifId/comments         | Comment on a specific Gif post  |
| GET /feed                          | View all articles and GIF posts |
| GET /articles/:articleId           | View a specific article         |
| GET /gifs/:gifId                   | View a specific GIF post        |
| GET /category/:categoryName        | View articles by category       |

#### UI

You can view the user interface here [Teamwork]()

## Author

Edafe Oghenefego
[@realFego](https://twitter.com/realFego)
