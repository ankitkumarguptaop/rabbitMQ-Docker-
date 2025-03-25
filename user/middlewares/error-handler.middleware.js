const {
  NotFound,
  BadRequest,
  NoContent,
  ForBidden,
  UnAuthorized,
} = require("../libs/errors");
const {
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
  NOT_FOUND,
  UNAUTHORIZED,
  FORBIDDEN,
  NO_CONTENT,
} = require("../libs/constants");
const { default: mongoose } = require("mongoose");

exports.errorHandler = (error, req, res, next) => {
  switch (true) {
    case error instanceof NotFound:
      res.status(NOT_FOUND).json({ message: error.message });
      break;
    case error instanceof BadRequest:
      res.status(BAD_REQUEST).json({ message: error.message });
      break;
    case error instanceof NoContent:
      res.status(NO_CONTENT).json({ message: error.message });
      break;
    case error instanceof ForBidden:
      res.status(FORBIDDEN).json({ message: error.message });
      break;
    case error instanceof UnAuthorized:
      res.status(UNAUTHORIZED).json({ message: error.message });
      break;
    case error instanceof mongoose.Error.ValidationError:
      res.status(BAD_REQUEST).json({ message: error.message });
      break;
    default:
      res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
