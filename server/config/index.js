global.__DEV__ = process.env.NODE_ENV === 'development';
global.__PROD__ = process.env.NODE_ENV === 'production';

let configSettings = {};
if (__DEV__) {
    configSettings = require('./config.dev');
} else if (__PROD__) {
  configSettings = require('./config.prod');
} else {
  throw new Error('Configuration Error: No environment defined');
}

module.exports = configSettings;
