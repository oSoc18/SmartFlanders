var assert = require('assert');
/**
 * Dummy test - Should always pass unless something is wrong with Mocha
 */
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });
});