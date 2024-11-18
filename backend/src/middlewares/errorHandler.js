const ResponseFormatter = require('../utils/ResponseFormatter');

const errorHandler = (err, req, res, next) => {
  let errorResponse;

  if (err.name === 'SequelizeValidationError') {
    errorResponse = ResponseFormatter.error(err.message, 400);
  }
  else if (err.message === 'NFT not found') {
    errorResponse = ResponseFormatter.error(err.message, 404);
  }
  else {
    errorResponse = ResponseFormatter.error('Something went wrong', 500);
  }

  return res.status(errorResponse.error.code).json(errorResponse);
};

module.exports = errorHandler;
