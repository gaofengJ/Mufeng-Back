const path = require('path')

const launchOptions = {
  timeout: 15000,
  ignoreHTTPSErrors: true,
  devtools: false,
  headless: true,
  executablePath: path.join(__dirname, '../chromium/chrome.exe')
}

module.exports = launchOptions
