const { check, query, validationResult } = require('express-validator');
const ResponseFormatter = require('../utils/ResponseFormatter'); 

const nftValidationRules = () => [
  check('title').isString().withMessage('Title must be a string'),
  check('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  check('currency').isString().withMessage('Currency must be a string'),
  check('image').isURL().withMessage('Image must be a valid URL'),
  check('type').isIn(['image', 'video']).withMessage('Type must be one of image, or video')
];

const nftFilterValidationRules = () => [
  query('type')
    .optional()
    .isIn(['image', 'video'])
    .withMessage('Type must be a string'),

  query('minPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('MinPrice must be a positive number'),
  
  query('maxPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('MaxPrice must be a positive number')
    .custom((value, { req, path }) => {
      const minPrice = req.query.minPrice;
      const maxPrice = req.query.maxPrice;

      if (minPrice !== undefined && maxPrice !== undefined) {
        if (parseFloat(maxPrice) <= parseFloat(minPrice)) {
          throw new Error('MaxPrice must be greater than MinPrice');
        }
      }
      return true;
    }),

  query('sortBy')
    .optional()
    .isIn(['price', 'createdAt'])  
    .withMessage('SortBy must be one of price, or createdAt'),

  query('order')
    .optional()
    .isIn(['ASC', 'DESC'])
    .withMessage('Order must be either ASC or DESC'),

  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),

  query('perPage')
    .optional()
    .isInt({ min: 1, max: 100 }) 
    .withMessage('perPage must be a positive integer, max 100')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => ({
      param: error.param,
      message: error.msg
    }));

    return ResponseFormatter.sendError(res, 'Validation failed', 400, errorMessages);
  }
  next();
};

module.exports = { nftValidationRules, nftFilterValidationRules, validate };
