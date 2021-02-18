const path = require('path')
const dotenv = require('dotenv')

function loadEnvConfig(envfile) {
  try {
    dotenv.config({
      path: envfile,
    })
    console.info('Loaded env from ', envfile)
  } catch (e) {
    // noop
  }
}

module.exports = function loadEnv() {
  loadEnvConfig(path.join(__dirname, '../.env.local'))
  loadEnvConfig(path.join(__dirname, '../.env'))
}
