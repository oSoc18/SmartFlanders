const csv = require("fast-csv");
require('enum').register();
const accessibilityState = new Enum(["Accessible", "AccessibleWithHelp", "NotAccessible", "Unknown"]);

module.exports = function (params) {
	return new Promise((resolve, reject) => {
		let accessiblityData = [];
		csv
			.fromPath("./toevla.csv", {
				headers: true
			})
			.on("data", function (d) {
				let result = matchingAddress(d, params);
				if(result != accessibilityState.Unknown) {
					accessiblityData.push(result);
				}
			})
			.on("end", function () {
				resolve(accessiblityData);
			})
			.on("error", function (error) {
				reject(error);
			});
	})
}

function matchingAddress(row, params) {
	if(params.straat.toLowerCase().trim() === row.AccommodatieStraat.toLowerCase().trim() && params.huisnummer == row.AccommodatieNummer && params.postcode == row.AccommodatiePostCode) {
		console.log("MATCH: " + row.HO_INK_Inkom_);
		console.log(row.AccommodatieStraat + " " + row.AccommodatieNummer + " " + row.AccommodatiePostCode);
		switch (row.HO_INK_Inkom_) {
			case "PLUS":
				return accessibilityState.Accessible;
			case "PLMN":
				return accessibilityState.AccessibleWithHelp;
			case "MIN":
				return accessibilityState.NotAccessible;
			default:
				return accessibilityState.Unknown;
		}
	}
	return accessibilityState.Unknown;
}
