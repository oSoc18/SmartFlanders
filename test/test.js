var assert = require("assert");
var transformer = require("../helpers/transformer");
var transformerController = require("../controllers/transformerController");
var openingHoursController = require("../controllers/openingHoursController");
var serviceController = require("../controllers/serviceController");

async function assertThrowsAsync(fn, regExp) {
	let f = () => {};
	try {
    		await fn();
  	} catch(e) {
	f = () => {throw e};
	} finally {
		assert.throws(f, regExp);
	}
}

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
	it("Transforming Building data without ToeVla data available", function() {
		//?gemeente=aalst&postcode=9300&straat=grote%20markt&huisnummer=1
		var params = { gemeente: "aalst", postcode: 9300, straat: "grote markt", huisnummer: 1 };
		transformer.adresFetcher(params);
	});
	it("Transforming Building data with ToeVla data available", function() {
		//?gemeente=roeselare&postcode=9300&straat=grote%20markt&huisnummer=1
		var params = { postcode: 8800, street: "botermarkt", number: 2 };
		transformer.adresFetcher(params);
	});
	it("Transforming wrong Building data", function() {
                //?gemeente=blablba&postcode=0157&straat=earth&huisnummer=-1
                var params = { gemeente: "blabla", postcode: 0157, straat: "earth", huisnummer: -1 };
                transformer.adresFetcher(params);
        });
	it("Transforming Service data", function() {
                //?gemeente=blablba&postcode=0157&straat=earth&huisnummer=-1
                var params = { 
			id: "URI:/123",
			openingHours: {
				"monday": ["09:00", "12:00" , "13:00", "17:00"],
				"tuesday": ["09:00", "12:00" , "13:00", "17:00"],
				"wednesday":  ["09:00", "12:00" , "13:00", "17:00"],
				"thursday": ["09:00", "12:00" , "13:00", "17:00"],
				"friday":  ["09:00", "12:00" , "13:00", "17:00"],
				"saturday":  ["09:00", "12:00" , "13:00", "17:00"],
				"sunday":  ["09:00", "12:00" , "13:00", "17:00"]
			},
			name: "Joske The Service",
			description: "Joske works hard at any time",
			productType: "URI:/456",
			telephone: "+324567891",
			email: "joske@ikwerkhier.com"
		};
                console.log(serviceController.addService(params));
        });
});

/*
 * Parsing opening hours to JSON-LD
 */
describe("Openinghours", function(){
	it("Should return opening hours in JSON-LD format", function() {
		let params = {
			openingHours: {
				"monday": ["09:00", "12:00" , "13:00", "17:00"],
				"tuesday": ["09:00", "12:00" , "13:00", "17:00"],
				"wednesday":  ["09:00", "12:00" , "13:00", "17:00"],
				"thursday": ["09:00", "12:00" , "13:00", "17:00"],
				"friday":  ["09:00", "12:00" , "13:00", "17:00"],
				"saturday":  ["09:00", "12:00" , "13:00", "17:00"],
				"sunday":  ["09:00", "12:00" , "13:00", "17:00"]
			}
		};
		console.log(openingHoursController.getOpeningHours(params.openingHours));
	})
})

/*
 * Validating the user input from the form
 */
describe("Validation", function() {
	// Validation getAdres input
	describe("getAdres", function() {
		it("getAdres valid params", async function() {
			let params = {
				postcode: "9300",
				street: "Botermarkt",
				number: "1",
				gemeente: "aalst"
			};
			await transformerController.getAdres(params)
		});

		it("getAdres should throw Postcode incorrect", async function () {
		    await assertThrowsAsync(async () => {
				let params = {
					postcode: "64414",
					street: "Botermarkt",
					number: "1",
					gemeente: "aalst"
				};
				await transformerController.getAdres(params)
			}, 
			/Error/);
		});
		it("getAdres should throw Number incorrect", async function () {
		    await assertThrowsAsync(async () => {
				let params = {
					postcode: "1800",
					street: "Botermarkt",
					number: "-1",
					gemeente: "aalst"
				};
				await transformerController.getAdres(params)
			}, 
			/Error/);
		});
		it("getAdres should throw Street incorrect", async function () {
		    await assertThrowsAsync(async () => {
				let params = {
					postcode: "9300",
					street: "flsdjfkldjflqjflqjfldjfsklqhflqmdjfdhflsdhbfsldfksdhflsdfh",
					number: "1",
					gemeente: "aalst"
				};
				await transformerController.getAdres(params)
			}, 
			/Error/);
		});
	});

	// Validation getGebouwEenheden input
	describe("getGebouwEenheden", function() {
		it("getGebouwEenheden valid number", async function() {
			let params = {
				adresObjectId: "3201926"
			};
			await transformerController.getGebouwEenheden(params)
		});

		it("getGebouwEenheden should throw AdresObjectId is geen nummer", async function () {
		    await assertThrowsAsync(async () => {
				let params = {
					// Public library Mechelen
					adresObjectId: "abc"
				};
				await transformerController.getGebouwEenheden(params)
			}, 
			/Error/);
		});
	});

	// Validation getGebouwEenheden input
	describe("getGebouwId", function() {
		it("getGebouwId valid number", async function() {
			let params = {
				// Public library Mechelen
				gebouwEenheidId: "6923391"
			};
			await transformerController.getGebouwId(params)
		});

		it("getGebouwId should throw GebouwEenheidId is geen nummer", async function () {
		    await assertThrowsAsync(async () => {
				let params = {
					gebouwEenheidId: "abc"
				};
				await transformerController.getGebouwId(params)
			}, 
			/Error/);
		});
	});
})
