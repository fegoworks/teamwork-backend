const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const query = require('../db/index');

router.post('/create-user', async (req, res) => {
  let newUser = new User();
  newUser = {
    ...req.body,
  };

  const hashedPassword = bcrypt.hashSync(newUser.password, 10);
  newUser.password = hashedPassword;

  const text = `INSERT INTO
      users(firstname, lastname, email, password, gender, department, address, jobrole)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      returning *`;

  const values = [
    newUser.firstname,
    newUser.lastname,
    newUser.email,
    newUser.password,
    newUser.gender,
    newUser.department,
    newUser.address,
    newUser.jobrole,
  ];

  try {
    const {
      rows,
    } = await query(text, values);
    return res.status(201).json({
      status: 'success',
      data: {
        message: 'User account successfully created',
        userId: rows[0].userid,
      },
    });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({
        status: 'Request failed',
        error: 'An account with this email already exists',
      });
    }
    return res.status(400).json({
      status: 'Request failed',
      error: error.detail,
    });
  }
});

router.post('/signin', async (req, res) => {
  const {
    email,
    password,
  } = req.body;

  const text = `
  SELECT * FROM Users WHERE email='${email}';
`;

  try {
    const {
      rows,
    } = await query(text);
    const validPassword = bcrypt.compareSync(password, rows[0].password);
    console.log(rows[0].password);

    if (!validPassword) {
      return res.status(400).json({
        status: 'Request failed',
        error: 'Wrong Password',
      });
    }
    return res.status(200).json({
      status: 'Successful',
      message: 'Signin successful',
    });
  } catch (error) {
    return res.status(400).json({
      status: 'Request failed',
      error: 'Invalid Email or Password',
    });
  }
});

module.exports = router;
