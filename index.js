/*
  Created by Oskari Mantere

  Contains code from the polonix-unofficial module by Tyler Filla
*/


const pairs = {
  BTC_USD: "btc_usd",
  BTC_EUR: "btc_eur",
  BTC_RUB: "btc_rub",
  ETH_USD: "eth_usd",
  ETH_BTC: "eth_btc",
  LTC_USD: "ltc_usd",
  LTC_EUR: "ltc_eur",
  LTC_RUB: "ltc_rub",
  LTC_BTC: "ltc_btc"
}



// Subunit modules for the various APIs offered by Poloniex
var API_MODULE_MAP = {
    "public": "./api/public.js",
    "trade": "./api/trade.js"
};

// API selector function
exports.api = function(name, params) {

    // Get the module
    var mod = API_MODULE_MAP[name];

    // Abort if module isn't, well, good... (type was probably invalid)
    if (!mod) {
        return;
    }

    // Return API module stuff
    return require(mod)(params);
};

exports.pairs = pairs;
