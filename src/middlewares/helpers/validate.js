const Joi = require('@hapi/joi');

const validator = {
  validateBody: (schema) => (req, res, next) => {
    const result = schema.validate(req.body);
    if (result.error) {
      return res.json({
        status: 400,
        error: result.error.message,
      }).status(400);
    }

    req.body = result.value;
    return next();
  },

  validateParams: (schema) => (req, res, next) => {
    const result = schema.validate(req.params);
    if (result.error) {
      return res.json({
        status: 400,
        error: result.error.message,
      }).status(400);
    }

    req.params = result.value;
    return next();
  },

  schemas: {
    authSchema: Joi.object().keys({

      firstname: Joi.string().regex(/^[a-zA-Z]*$/).required()
        .trim()
        .lowercase()
        .error(new Error('First Name is required')),
      lastname: Joi.string().regex(/^[a-zA-Z\\-]*$/).required()
        .trim()
        .lowercase()
        .error(new Error('Last Name is required')),
      email: Joi.string().email().required()
        .trim()
        .lowercase()
        .error(new Error('A valid email address is required')),
      password: Joi.string().required()
        .error(new Error('Password is required')),
      gender: Joi.string().required()
        .trim()
        .lowercase()
        .valid('male', 'female')
        .error(new Error('Gender must be male or female and is required')),
      department: Joi.string().required()
        .trim()
        .lowercase()
        .error(new Error('Department is required')),
      address: Joi.string().required()
        .trim()
        .lowercase()
        .error(new Error('Address is required')),
      jobrole: Joi.string().required()
        .trim()
        .lowercase()
        .error(new Error('Job role is required')),
      usertype: Joi.string().required()
        .trim()
        .lowercase()
        .valid('admin', 'employee')
        .error(new Error('User type must be admin or employee and is required')),
    }),
    authLoginSchema: Joi.object().keys({
      email: Joi.string().regex(/\S+@\S+\.\S+/).required()
        .trim()
        .lowercase()
        .error(new Error('A valid email address is required')),
      password: Joi.string().required()
        .error(new Error('Password is required')),
    }),
    createArticleSchema: Joi.object().keys({
      title: Joi.string().required()
        .trim()
        .lowercase()
        .error(new Error('An article title is required')),
      message: Joi.string().required()
        .trim()
        .lowercase()
        .error(new Error('An article message is required')),
    }),
    createGifSchema: Joi.object().keys({
      title: Joi.string().required()
        .trim()
        .lowercase()
        .error(new Error('A Gif post title is required')),
      image: Joi.any().required()
        .error(new Error('A Gif file is required')),
    }),
    createComment: Joi.object().keys({
      comment: Joi.string().required()
        .trim()
        .lowercase()
        .error(new Error('A comment is required')),
    }),
    gifIdSchema: Joi.object().keys({
      gifid: Joi.string().guid({
        version: [
          'uuidv4',
        ],
      }).required()
        .error(
          new Error('gifId must be a uuid'),
        ),
    }),
    articleIdSchema: Joi.object().keys({
      articleid: Joi.string().guid({
        version: [
          'uuidv4',
        ],
      }).required()
        .error(
          new Error('articleId must be a uuid'),
        ),
    }),
    articleCategorySchema: Joi.object().keys({
      categoryName: Joi.string().regex(/^[a-zA-Z\\-]*$/).required()
        .trim()
        .lowercase()
        .error(new Error('Category Name is required')),
    }),
  },
};

module.exports = validator;
