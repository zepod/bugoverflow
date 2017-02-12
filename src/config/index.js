window.__DEV__ = process.env.NODE_ENV === 'development'
window.__PROD__ = process.env.NODE_ENV === 'production'
console.log('nev', process.env.NODE_ENV)
let configSettings = {}
if (__DEV__) {
    configSettings = require('./config.dev')
} else if (__PROD__) {
  configSettings = require('./config.prod')
} else {
  throw new Error('Configuration Error: No environment defined')
}

export default configSettings
