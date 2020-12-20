const path = require('path')

const launchOptions = {
  timeout: 15000,
  ignoreHTTPSErrors: true,
  devtools: false,
  headless: false,
  executablePath: path.join(__dirname, '../chromium/chrome.exe')
}

module.exports = launchOptions
