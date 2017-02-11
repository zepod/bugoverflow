// const writeLog = require('errors/writeLog');
const getErrorType = require('utils').getErrorType;

module.exports = {
  handle: (trueError, req, res, next) => {
    const error = res.locals.handledError;
    // writeLog(req, error, trueError)
    if (!error) return next(trueError);
    // send back cool json error without stack trace
    delete error.trace;
    res.status(error.status).json(error);
  },

  throw: ({error: {status = 500, message = "That's awkard..."} = {}, next, res, err}) => {
    if (err) console.error(err);
    const trace = err ? err.stack : new Error().stack;
    res.locals.handledError = {
      status,
      type: getErrorType(status),
      message,
      trace
    };
    next(err || res.locals.handledError);
  }
}
