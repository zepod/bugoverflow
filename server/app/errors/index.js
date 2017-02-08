const writeLog = require('./writeLog');
const getErrorType = require('../utils').getErrorType;

module.exports = {
  handle: (trueError, req, res, next) => {
    const error = res.locals.handledError;
    if (!error) return next();

    console.error(`\n${trueError || error}\n`);
    trueError && writeLog(req, error, trueError)

    delete error.trace;
    res.status(error.status).send(JSON.stringify(error));
  },
  // /**
  //  * Throw error
  //  *
  //  * @param {function} Next
  //  * @param {number} Status
  //  * @param {string} info
  //  * @api private
  //  */
  //
  throw: ({next, error: {status, message}, res, trueError}) => {
    const trace = new Error().stack;
    const type = getErrorType(status)
    res.locals.handledError = {
      status,
      type,
      message,
      trace
    };
    next(trueError);
  }
}
