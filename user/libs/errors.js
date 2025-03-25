class BadRequest extends Error {
  constructor(message) {
    super(message);
  }
}

class NotFound extends Error {
  constructor(message) {
    super(message);
  }
}

class UnAuthorized extends Error {
  constructor(message) {
    super(message);
  }
}

class NoContent extends Error {
  constructor(message) {
    super(message);
  }
}

class ForBidden extends Error {
  constructor(message) {
    super(message);
  }
}

module.exports = {
  ForBidden,
  NoContent,
  UnAuthorized,
  NotFound,
  BadRequest,
};
