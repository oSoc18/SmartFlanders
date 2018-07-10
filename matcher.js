const csv = require("fast-csv");
require('enum').register();
let data = [];

module.exports = function (params) {
	let accessiblityData = [];
	csv
	.fromPath("./toevla.csv", {
		headers: true
	})
	.on("data", function (d) {
		accessiblityData.push(matchingAddress(d, params));
	})
	.on("end", function () {
		console.log("done");
		return accessibilityData;
	})
	.on("error", function (error) {
		console.log(error);
	});
}

function matchingAddress(row, params) {
	var accessibilityState = new Enum(["Accessible", "AccessibleWithHelp", "NotAccessible", "Unknown"]);
	if (params.straat && row.AccommodatieStraat && params.huisnummer && row.AccommodatieNummer && params.postcode && row.AccommodatiePostCode) {
		if (row.AccommodatieStraat.toLowerCase() == params.straat.toLowerCase() && row.AccomodatiePostCode == params.postcode && row.AccommodatieNummer == params.huisnummer) {
			switch (row.O_INKD_Inkomdeur_) {
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
	else {
		return accessibilityState.Unknown;
	}
}
