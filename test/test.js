var assert = require("assert");
var transformer = require("../transfromer");


/**
 * Dummy test - Should always pass unless something is wrong with Mocha
 */
describe("Array", function() {
  describe("#indexOf()", function() {
    it("should return -1 when the value is not present", function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });
});

/**
 * Building fetcher and ToeVla matcher - Checks if our transformer and matcher are working correctly
 */
describe("Transformer", function() {
	it("Trun transformer and search for matches in ToeVla CSV file", function() {
		//?gemeente=aalst&postcode=9300&straat=grote%20markt&huisnummer=1
		var params = { gemeente:"aalst", postcode: 9300, straat: "grote%20markt", huisnummer: 1 };
		transformer.transformer(params);
	});
});
