var assert = require("assert");
var transformer = require("../helpers/transformer");
var openinghoursController = require('../controllers/openingHoursController');

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
	it("Transforming data without ToeVla data available", function() {
		//?gemeente=aalst&postcode=9300&straat=grote%20markt&huisnummer=1
		var params = { gemeente:"aalst", postcode: 9300, straat: "grote markt", huisnummer: 1 };
		transformer.adresFetcher(params);
	});
	it("Transforming data with ToeVla data available", function() {
		//?gemeente=roeselare&postcode=9300&straat=grote%20markt&huisnummer=1
		var params = { postcode: 8800, street: "botermarkt", number: 2 };
		transformer.adresFetcher(params);
	});
	it("Transforming wrong data", function() {
                //?gemeente=blablba&postcode=0157&straat=earth&huisnummer=-1
                var params = { gemeente:"blabla", postcode: 0157, straat: "earth", huisnummer: -1 };
                transformer.adresFetcher(params);
        });
});

describe("Openinghours", function(){
	it("Should return openinghours in JSON-LD format", function() {
		let params = {
			openinghours : {
				"monday": ["09:00", "12:00" , "13:00", "17:00"],
				"tuesday": ["09:00", "12:00" , "13:00", "17:00"],
				"wednesday":  ["09:00", "12:00" , "13:00", "17:00"],
				"thursday": ["09:00", "12:00" , "13:00", "17:00"],
				"friday":  ["09:00", "12:00" , "13:00", "17:00"],
				"saturday":  ["09:00", "12:00" , "13:00", "17:00"],
				"sunday":  ["09:00", "12:00" , "13:00", "17:00"]
			}
		};
		console.log(openinghoursController.getOpeningHours(params));
	})
})
