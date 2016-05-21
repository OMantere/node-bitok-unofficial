/*
  Created by Oskari Mantere

  Using code froḿ the polonix-unofficial module
*/


// Import modules
var request = require("request");
var url = require("url");

// Representation of the Poloniex public API
var apiPublic = {};



/*
 *
 * function sendQuery(command, pair, callback)
 *
 */
function sendQuery(command, pair, callback) {

    // Parse public API URL
    var queryUrl = "http://api.bitok.com/open_api";

    // Add pair and query to URL
    queryUrl = queryUrl + '/' + pair + '/' + command

    // Build options for request
    var opts = {
        "url": url.format(queryUrl),
        "method": "GET"
    };

    console.log(opts)

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
}


apiPublic.getDepth = function(pair, callback) {
    // Send returnTicker query

    sendQuery("depth", pair, (err, response) => {
        if (err) {
            // Call back with decoupled error info
            callback({"msg": err.msg}, null);
        } else {
            // Call back with response
            callback(null, response);
        }
    });
}

apiPublic.getTicker = function(pair, callback) {
    // Send returnTicker query
    sendQuery("ticker", pair, (err, response) => {
        if (err) {
            // Call back with decoupled error info
            callback({"msg": err.msg}, null);
        } else {
            // Call back with response
            callback(null, response);
        }
    });
}

apiPublic.getTrades = function(pair, callback) {
    // Send returnTicker query
    sendQuery("trades", pair, (err, response) => {
        if (err) {
            // Call back with decoupled error info
            callback({"msg": err.msg}, null);
        } else {
            // Call back with response
            callback(null, response);
        }
    });
}

apiPublic.getTradeFee = function(pair, callback) {
    // Send returnTicker query
    sendQuery("fee", pair, (err, response) => {
        if (err) {
            // Call back with decoupled error info
            callback({"msg": err.msg}, null);
        } else {
            // Call back with response
            callback(null, response);
        }
    });
}


module.exports = function(params) {
    return apiPublic;
}
