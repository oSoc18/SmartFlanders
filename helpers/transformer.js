const https = require("https");
const matcher = require("./matcher");
const lambertToWGS = require("./lambertToWGS");
const openingHoursController = require("../controllers/openingHoursController");

/**
 * Get all possible addresses based on adress
 * @param {number} params 
 */
exports.adresFetcher = async (params) => {
    return JSON.parse(await fetch(`https://basisregisters.vlaanderen.be/api/v1/adressen?Postcode=${params.postcode}&Straatnaam=${encodeURI(params.street)}&Huisnummer=${params.number}`));
}

/**
 * Fetches a gebouwEenheid based on a adresId, can return multiple gebouweenheden!
 * @param {number} adresObjectId 
 */
exports.gebouwEenheidFetcher = async (params) => {
    try {
        return JSON.parse(await fetch("https://basisregisters.vlaanderen.be/api/v1/gebouweenheden?AdresObjectId=" + params.adresObjectId));

    }catch(err){
        console.error(err)
    }
}
/**
 * Fetches a gebouwId based on gebouwEenheidId
 * @param {number} gebouwEenheidID 
 */
exports.gebouwFetcher =  async (params) => {
    let gebouwId = await fetch("https://basisregisters.vlaanderen.be/api/v1/gebouweenheden/" + params.gebouwEenheidId)
    let gebouwDetails = await fetch("https://basisregisters.vlaanderen.be/api/v1/gebouwen/" + JSON.parse(gebouwId).gebouw.objectId)
    return jsonLDBuilding(JSON.parse(gebouwDetails).identificator.objectId, JSON.parse(gebouwId).adressen[0].objectId, lambertToWGS(JSON.parse(gebouwId).geometriePunt.point.coordinates[0], JSON.parse(gebouwId).geometriePunt.point.coordinates[1]))
};

/**
 * Adds a service
 * @param {number} gebouwEenheidID 
 */
exports.makeService =  async (params) => {
	// Convert to our internal representation of opening hours
	let openingHours = {
				"monday": [params["mo-start-am"], params["mo-end-am"], params["mo-start-pm"], params["mo-end-pm"]],
				"tuesday": [params["tu-start-am"], params["tu-end-am"], params["tu-start-pm"], params["tu-end-pm"]],
				"wednesday": [params["we-start-am"], params["we-end-am"], params["we-start-pm"], params["we-end-pm"]],
				"thursday": [params["th-start-am"], params["th-end-am"], params["th-start-pm"], params["th-end-pm"]],
				"friday": [params["fr-start-am"], params["fr-end-am"], params["fr-start-pm"], params["fr-end-pm"]],
				"saturday": [params["sa-start-am"], params["sa-end-am"], params["sa-start-pm"], params["sa-end-pm"]],
				"sunday": [params["su-start-am"], params["su-end-am"], params["su-start-pm"], params["su-end-pm"]]
			}
	return jsonLDService(params.id, params.name, params.description, params.productType, params.telephone, params.email, openingHours);
};
    
/**
 * Helper function to get the data based on the url
 * @param {string} url 
 */
function fetch(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            console.log(url);
            let data = "";
            res.on("data", (d) => {
                data += d;
            });
            res.on("end", () => {
                resolve(data);
            });
            res.on("err", (err) => {
                reject(err);
            })
        })
    })
}
/**
 *  Generates a JSON-LD building file based on the given URIs
 * @param {number} gebouwId 
 * @param {number} adresId 
 * @param {number} location 
 */
function jsonLDBuilding(gebouwId, adresId, location) {
    return {
        "@context": {
            "gebouwenRegister": "http://data.vlaanderen.be/id/gebouw/",
            "adressenRegister": "https://data.vlaanderen.be/id/adres/",
            "gebouw": "http://data.vlaanderen.be/ns/gebouw#",
            "schema": "http://schema.org/",
            "dcterms": "http://purl.org/dc/terms/",
            "toevla": "http://semweb.mmlab.be/ns/wa#",
            "locn": "http://www.w3.org/ns/locn#",
            "geo": "http://www.opengis.net/ont/geosparql#",
            "xsd": "http://www.w3.org/2001/XMLSchema#"
        },
        "@id": "gebouw:" + gebouwId,
        "gebouw:Gebouw.adres": {
            "@id": "http://data.vlaanderen.be/id/adres/" + adresId,
            "@type": "http://www.w3.org/ns/locn#Address",
            "http://www.w3.org/2003/01/geo/wgs84_pos#location": {
               "@type": "http://www.w3.org/2003/01/geo/wgs84_pos#Point",
               "http://www.w3.org/2003/01/geo/wgs84_pos#lat": location[0],
               "http://www.w3.org/2003/01/geo/wgs84_pos#long": location[1]
             }
           }
        }
}
/**
 *  Generates a JSON-LD service file based on the given URIs
 * @param {number} gebouwId 
 * @param {number} adresId 
 * @param {number} location 
 */
function jsonLDService(id, name, description, productType, telephone, email, openingHours) {
	let jsonLD = [
	    {
		"@context": "http://schema.org/",
		"@type": "Service",
		"name": name,
		"description": description,
		"http://purl.org/oslo/ns/localgov#productType": productType,
		"telephone": telephone,
		"email": email,
		"https://schema.org/hoursAvailable": openingHoursController.getOpeningHours(openingHours)
	    },
	    {
		"@type": "http://purl.org/vocab/cpsv#PublicService",
		"http://data.europa.eu/m8g/hasChannel": {
		    "https://schema.org/hoursAvailable": openingHoursController.getOpeningHours(openingHours)
		},
		"http://purl.org/dc/terms/description": description
	    }
        ];

	// Only add ID if available
	if(id.length > 0) {
		jsonLD[0]["@id"] = id;
		jsonLD[1]["@id"] = id;
	}

	return jsonLD;
}
