const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');
const query = require('../db/index');

const userController = {
  async createUser(req, res) {
    let newUser = new User();
    newUser = {
      ...req.body,
    };

    const hashedPassword = bcrypt.hashSync(newUser.password, 10);
    newUser.password = hashedPassword;

    const text = `INSERT INTO
        users(firstname, lastname, email, password, gender, department, address, jobrole, usertype)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
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
      newUser.usertype,
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
        error,
      });
    }
  },

  async signIn(req, res) {
    const {
      email,
      password,
    } = req.body;

    const text = ` SELECT * FROM Users WHERE email='${email}';`;

    try {
      const {
        rows,
        rowCount,
      } = await query(text);

      if (rowCount < 1) {
        return res.status(401).json({
          error: 'User not found',
        });
      }

      const {
        ...data
      } = rows[0];

      const validPassword = bcrypt.compareSync(password, data.password);
      if (!validPassword) {
        return res.status(401).json({
          status: 'Request failed',
          error: 'Wrong Password',
        });
      }

      const token = jwt.sign({
        id: data.userid,
        usertype: data.usertype,
        email: data.email,
      }, process.env.SECRET, {
        expiresIn: 86400, // expires in 24 hours
      });

      return res.status(200).json({
        status: 'success',
        data: {
          token,
          id: data.userid,
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: 'Request failed',
        error: 'Invalid Email or Password',
      });
    }
  },

  async getAUser(userid) {
    const text = ` SELECT * FROM Users WHERE userid ='${userid}';`;
    try {
      const {
        rows,
        rowCount,
      } = await query(text);

      if (rowCount < 1) {
        return {
          error: 'User not found',
        };
      }
      return rows[0];
    } catch (error) {
      return {
        status: 'Request failed',
        error,
      };
    }
  },

};

module.exports = userController;
