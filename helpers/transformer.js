const https = require("https");
const matcher = require("./matcher");
const lambertToWGS = require("./lambertToWGS");
/**
 * Get all possible addresses based on adress
 * @param {number} params 
 */
exports.adresFetcher = async (params) => {
    return JSON.parse(await fetch(`https://basisregisters.vlaanderen.be/api/v1/adressen?Gemeentenaam=${params.gemeente}&Postcode=${params.postcode}&Straatnaam=${encodeURI(params.street)}&Huisnummer=${params.number}`));
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
    return jsonLD(JSON.parse(gebouwId).gebouw.objectId, params.adresId, lambertToWGS(JSON.parse(gebouwDetails).geometriePunt.point.coordinates[0], JSON.parse(gebouwDetails).geometriePunt.point.coordinates[1]))
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
 *  Generates a JSON-LD file based on the given URIs
 * @param {number} gebouwId 
 * @param {number} adresId 
 * @param {number} location 
 */
function jsonLD(gebouwId, adresId, location) {
    return {
        "@context": {
            "gebouwenRegister": "http://data.vlaanderen.be/id/gebouw/",
            "adressenRegister": "https://data.vlaanderen.be/doc/adres/",
            "gebouw": "http://data.vlaanderen.be/ns/gebouw#",
            "schema": "http://schema.org/",
            "dcterms": "http://purl.org/dc/terms/",
            "toevla": "http://semweb.mmlab.be/ns/wa#",
            "locn": "http://www.w3.org/ns/locn#",
            "geo": "http://www.opengis.net/ont/geosparql#",
            "xsd": "http://www.w3.org/2001/XMLSchema#"
        },
        "@id": "gebouw:" + gebouwId,
        "http://www.w3.org/2003/01/geo/wgs84_pos#": {
            "http://www.w3.org/2003/01/geo/wgs84_pos#point": [{
                    "http://www.w3.org/2003/01/geo/wgs84_pos#lat": location[0]
                },
                {
                    "http://www.w3.org/2003/01/geo/wgs84_pos#long": location[1]
                }

            ]
        },
        "https://data.vlaanderen.be/doc/adres": "adressenRegister:" + adresId.adressen[0].identificator.objectId
    }
}