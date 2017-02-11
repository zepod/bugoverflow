const fs = require('fs');
const path = require('path');

module.exports = function writeLog(req, err, trueError) {
    const reportlog = path.join(__dirname + '/../../reports.txt');
    fs.readFile(reportlog, (er, data = '') => {
      if (er) console.error('Error Writing to reports occured =>\n', er)
      const log = `----------------------------------${new Date()}-----------------------------------------
      \nnew ERROR: ${req.connection.remoteAddress}: ${err.type} {\n   ${err.message} \n}\n ${trueError.message} \n ${trueError.stack}\n\n${data}`
      fs.writeFile(reportlog, log)
    });
}
