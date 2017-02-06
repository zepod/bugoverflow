const fs = require('fs');
const path = require('path');
const messages = require('./messages');

module.exports = {
  handle: (err, req, res, next) => {
    if (!err) return next();
    const status = +err.message.substr(0, 3);
    console.error(err);
    const reportlog = path.join(__dirname + '/../../reports.txt');
    fs.readFile(reportlog, (er, data) => {
      if (er) console.error('Error Writing to reports occured =>\n', er)
      const intlog = `----------------------------------${new Date()}-----------------------------------------
      \nnew ERROR: ${req.connection.remoteAddress}: ${err.name} {\n   ${err.message} \n} \n ${err.stack}\n\n${data}`
      fs.writeFile(reportlog, intlog)
    });
    const extlog = `Unfortunate happening:\n ${status}: "${err.message}"\n ${err.stack}`
    res.status(status).send(extlog)
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
  throw: (next, status, info) => {
    const randomMessageIndex = Math.floor(Math.random() * 3);
    const message = messages['' + status][randomMessageIndex];
    next(new Error(`${status}, ${message}, ${info && info}`))
  }
}
