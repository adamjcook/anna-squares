var _ = require('underscore');

// Load app configuration
module.exports = _.extend(
  require(__dirname + '/../config/env/base.js'),
  require(__dirname + '/../config/env/' + process.env.NODE_ENV + '.js') || {});