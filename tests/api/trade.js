var chai = require('chai');
var expect = chai.expect;

const tradeApi = require('../../').api('trade', { key: '02e4aefd8e6d0a058705f4f4896957a5', secret: '42c73b95b1a92c74f89494c16b6a6f810937fdda026db6de4eced3e1002eb35a8e766c2117058257e917a6dcc20d14bddf66ef9179b003efca06f614e1d10303' })
const pairs = require('../../').pairs


describe('Trade API', function() {
  describe('getInfo', function() {
    it('should return complete account info', function(done) {
      tradeApi.getInfo(pairs.BTC_USD, function(err, response) {
        expect(err).to.equal(null)
        expect(response.success).to.equal(1)
        expect(response.return).to.include.keys('funds', 'funds_on_hold', 'affiliate_funds', 'rights')
        done()
      })
    })
  })
  describe('TransHistory', function() {
    /*it('should return transaction history', function(done) {
      tradeApi.TransHistory(null, function(err, response) {
        expect(err).to.equal(null)
        expect(response.success).to.equal(1)
        expect(response.return).to.include.keys('total', 'rows')
        done()
      })
    })*/
    it('should return no transactions with "since" set to present', function(done) {
      tradeApi.TransHistory({ since: new Date() }, function(err, response) {
        expect(err).to.equal(null)
        expect(response.success).to.equal(1)
        expect(response.return).to.include.keys('total', 'rows')
        expect(response.return.rows).to.be.empty
        done()
      })
    })
  })
})
