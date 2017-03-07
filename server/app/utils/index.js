const qs = require('qs');

module.exports = {
  getErrorType: (status) => {
    switch (status) {
      case 400:
        return 'Bad Request'
      case 404:
        return 'Not found'
      case 500:
        return 'Internal Server Error'
      default:
        return 'Unspecified Error'
    }
  },
  constructQuery: (options) => {
    if (options.search) {
      const query = qs.parse(options.search);

      const property = Object.keys(query);
      // make sure phrases is Array
      const phrases = Array.isArray(query[property]) ? query[property] : [query[property]]
      const mongooseQuery = {};
      // merge phrases into regexp
      const regexp =  new RegExp(phrases.reduce((regexp, phrase) => `(?=.*${phrase})${regexp}`, ''), 'i');

      // construct mongooseQuery
      mongooseQuery[property] = {};
      mongooseQuery[property].$regex = regexp;
      mongooseQuery[property].$options = 'i';

      return mongooseQuery;
    }

    if (options.filter) return qs.parse(options.filter)

    return { _id: { $not: { $eq: null } } }
  }
}
// { title: [ 'wam', 'sarm' ] }
// '?search[title]=wam&search[title]=sarm'
// `{ name: { $regex: /acme.*corp/, $options: 'i', $nin: [ 'acmeblahcorp' ] } }`
