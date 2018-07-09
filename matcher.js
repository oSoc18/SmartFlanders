const csv = require("fast-csv");
<<<<<<< HEAD
let data = [];

module.exports = function (params) {
	csv
		.fromPath("./toevla.csv", {
			headers: true
		})
		.on("data", function (d) {
			matchingAddress(d, params);
		})
		.on("end", function () {
			//console.log(array);
			console.log("done");
		})
		.on("error", function (error) {
			console.log(error);
		});
}

function matchingAddress(row, params) {
	if (params.straat && row.AccommodatieStraat) {
		if (row.AccommodatieStraat.toLowerCase() == params.straat.toLowerCase()) {
			switch (row.O_INKD_Inkomdeur_) {
				case "PLUS":
					console.log("It's a match! +");
					break;
				case "PLMN":
					console.log("It's a match! +/-");
					break;
				case "MIN":
					console.log("It's a match! -");
					break;
				default:
					console.log("It's a match! UNKNOWN");
					break;
			}
		}
	}
}
=======
let data = []; 

module.exports = function(params){
    csv
    .fromPath("./toevla.csv", {headers: true})
	.on("data", function(d){
		matchingAddress(d, params);
	})
	.on("end", function(){
		//console.log(array);
		console.log("done");
	})
	.on("error", function(error){
		console.log(error);
	});
}

function matchingAddress(row, params) {
    console.log(row);
	console.log(params);

	if(params &&row &&row.AccomodatieStraat.toLowerCase() == params.straat.toLowerCase()) {
		switch(entranceAccesible) {
			case "PLUS":
			console.log("It's a match! +");
			break;

			case "PLMN":
			console.log("It's a match! +/-");
			break;

			case "MIN":
			console.log("It's a match! -");
			break;

			default:
			console.log("It's a match! UNKNOWN");
			break;
		}
		
	}
}

>>>>>>> chore(): :bug:
