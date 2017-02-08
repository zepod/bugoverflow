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
  }
}
