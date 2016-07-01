var config = require('../config');

module.exports = {
  title: 'Things Framework',
  description: 'Developed with Things Start Kit',
  charset: 'UTF-8',
  lang: 'en-US',
  // Add to homescreen for Chrome on Android
  applicationName: 'X-MES',
  // Add to homescreen for Safari on iOS
  appleMobileWebAppTitle: 'X-MES',
  // Google Analytics Tracking ID
  // googleAnalyticsTrackingId: 'UA-XXXXX-Y',
  // App name
  appName: config.appName,
  // App theme
  appTheme: config.appTheme,
  xmesUiTheme: config.xmesUiTheme,
  xmesOiTheme: config.xmesOiTheme,
  // App version
  appVersion: config.appVersion,
  responsiveWidth :'640px'
};
