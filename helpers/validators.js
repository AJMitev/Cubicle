function validateHttp(url) {
  return url.startsWith('http://') || url.startsWith('https://');
}

module.exports = {
  validateHttp
};
