var chai = require('chai');
var expect = chai.expect;

const publicApi = require('../../').api('public', null)
const pairs = require('../../').pairs

describe('Public API', function() {
  describe('getDepth', function() {
    it('should return asks and bids', function(done) {
      publicApi.getDepth(pairs.BTC_USD, function(err, response) {
        expect(err).to.equal(null)
        expect(response).to.include.keys('asks', 'bids')
        done()
      })
    })
  })
  describe('getFee', function() {
    it('should return the fee', function(done) {
      publicApi.getTradeFee(pairs.BTC_USD, function(err, response) {
        expect(err).to.equal(null)
        expect(response).to.include.keys('trade')
        done()
      })
    })
  })
})
