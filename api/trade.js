/*
  Created by Oskari Mantere
*/

// Import modules
const request = require("request");
const url = require("url");
const crypto = require('crypto');
const _ = require('lodash')
const querystring = require('querystring')
const unixTime = require('unix-time')

// Representation of the trade API
var apiTrade = {};

var apiKey = '02e4aefd8e6d0a058705f4f4896957a5'
var apiSecret = '42c73b95b1a92c74f89494c16b6a6f810937fdda026db6de4eced3e1002eb35a8e766c2117058257e917a6dcc20d14bddf66ef9179b003efca06f614e1d10303'

// Parse the trade API URL
var queryUrl = url.parse("https://api.bitok.com");

// Incremented with each request
var nonce;


// Build options for request
var generateOpts = function(method, params) {

  var postObject = params
  postObject.nonce = nonce
  postObject.method = method

  const postData = querystring.stringify(postObject)

  var opts = {
    "url": url.format(queryUrl),
    "method": "POST",
    "body": postData,
    "headers": {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData),
      "Key": apiKey,
      "Sign": crypto.createHmac('sha512', apiSecret).update(postData).digest('hex')
    }
  }

  return opts;
};


var findAndConvertDateParamsToUnixTime = function(params, callback) {
  var returnParams = params
  if(_.has(params, 'since')) {
    if(!(params.since instanceof Date)) {
      callback('"since" must be an instance of Date', null)
    }
    returnParams.since = unixTime(params.since)
  }
  if(_.has(params, 'end')) {
    if(!(params.end instanceof Date)) {
      callback('"end" must be an instance of Date', null)
    }
    returnParams.end = unixTime(params.end)
  }

  callback(null, returnParams)
}



/*
 *
 * function sendQuery(method, params, callback)
 *
 */
function sendQuery(method, params, callback) {

    // Abort if credentials arent defined
    if(apiKey.length == 0 || apiSecret.length == 0) {
      callback({ "msg": "Please define API key and secret." }, null);
      return;
    }

    // Check for date parameters and convert them to UNIX time
    findAndConvertDateParamsToUnixTime(params, function(err, params) {
      if(err)
        callback({"msg": "Invalid parameters: " + err}, null);

      var opts = generateOpts(method, params)

      // Send request
      request(opts, function(error, response, body) {
          if (!error && response && response.statusCode == 200) {
              // Parse body as JSON
              var bodyObj = JSON.parse(body);

              // Check if request returned an API error
              if (bodyObj.error) {
                  // Call back with provided error info
                  callback({"msg": "Bitok: " + bodyObj.error}, null);
              } else {
                  // Call back with parsed response
                  callback(null, bodyObj);
              }
          } else {
              // Call back with error info
              callback({"msg": "Request failed", "reqError": error, "reqResponse": response}, null);
          }
      });

      nonce++
    })
}


function apiCall(name, params, callback) {
  sendQuery(name, params, (err, response) => {
      if (err) {
          // Call back with decoupled error info
          callback(err, null);
      } else {
          // Call back with response
          callback(null, response);
      }
  });
}


apiTrade.getInfo = function(params, callback) {
    apiCall("getInfo", {}, callback)
}

apiTrade.TransHistory = function(params, callback) {
    apiCall("TransHistory", params, callback)
}

apiTrade.TradeHistory = function(params, callback) {
    apiCall("TradeHistory", params, callback)
}


module.exports = function(params) {
  apiKey = params.key;
  apiSecret = params.secret;
  nonce = 1;

  return apiTrade;
}
