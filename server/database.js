const mongoose = require('mongoose');
const config = require('./config');

const initDB = (cb) => {

  const options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
                  replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };
  mongoose.connect(`mongodb://${config.db.user}:${config.db.pwd}@ds135089.mlab.com:35089/${config.db.name}`, options);

  const db = mongoose.connection;

  db.on('error',  console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('===> Database connection established');
    if (cb) cb();
  })
  return db;
}
module.exports = initDB;
