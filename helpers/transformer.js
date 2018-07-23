const https = require("https");
const matcher = require("./matcher");
const lambertToWGS = require("./lambertToWGS");
const fs = require('fs');
const path = require('path')
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

    } catch (err) {
        console.error(err)
    }
}
/**
 * Fetches a gebouwId based on gebouwEenheidId
 * @param {number} gebouwEenheidID
 */
exports.gebouwFetcher = async (params) => {
    let gebouwId = await fetch("https://basisregisters.vlaanderen.be/api/v1/gebouweenheden/" + params.gebouwEenheidId)
    let gebouwDetails = await fetch("https://basisregisters.vlaanderen.be/api/v1/gebouwen/" + JSON.parse(gebouwId).gebouw.objectId)
    if (Array.isArray(params.postcode)) params.postcode = params.postcode[0];
    fs.readdir(__dirname + '/../files', (err, files) => {
        if (err) console.error(err.message)
        if (!files.includes(params.postcode)) {
            fs.mkdir(__dirname + `/../files/${params.postcode}`, err => {
                if (err) throw new Error("Error while creating directory")
                fs.mkdir(__dirname + `/../files/${params.postcode}/gebouwen`, err => {
                    if (err) throw new Error("Errow while creating /gebouwen directory")

                })
                fs.mkdir(__dirname + `/../files/${params.postcode}/services`, err => {
                    if (err) throw new Error("Error while creating /services directory")
                })
                fs.writeFile(__dirname + `/../files/${params.postcode}/catalog.json`, createCatalogFileForCity(params.postcode, JSON.parse(gebouwId).gebouw.objectId), err => {
                    if (err) throw new Error("Error while writing catalog file of specific building")
                    fs.writeFile(__dirname + `/../files/${params.postcode}/gebouwen/${JSON.parse(gebouwId).gebouw.objectId}.json`,
                        JSON.stringify(jsonLDBuilding(JSON.parse(gebouwDetails).identificator.objectId, JSON.parse(gebouwId).adressen[0].objectId,
                            lambertToWGS(JSON.parse(gebouwId).geometriePunt.point.coordinates[0], JSON.parse(gebouwId).geometriePunt.point.coordinates[1]))),
                        err => {
                            if (err) throw new Error("Error while writing building JSON")
                        })
                })
            })

            fs.readFile(__dirname + '/../files/master-catalog.json', (err, data) => {
                if (err) throw new Error("error while reading master-catalog file")
                let file_data = JSON.parse(data);
                file_data["dcterms:hasPart"].push({
                    "foaf:page": `http://smartflanders.ilabt.imec.be/graph/${params.postcode}/catalog.json`,
                    "@type": "dcat:Catalog"
                });
                fs.writeFile(__dirname + '/../files/master-catalog.json', JSON.stringify(file_data), err => {
                    if (err) throw new Error("Error while writing files");
                })
            })
        } else {
            fs.writeFile(__dirname + `/../files/${params.postcode}/gebouwen/${JSON.parse(gebouwId).gebouw.objectId}.json`,
                JSON.stringify(jsonLDBuilding(JSON.parse(gebouwDetails).identificator.objectId, JSON.parse(gebouwId).adressen[0].objectId,
                    lambertToWGS(JSON.parse(gebouwId).geometriePunt.point.coordinates[0], JSON.parse(gebouwId).geometriePunt.point.coordinates[1]))),
                err => {
                    if (err) throw new Error("Error while writing building JSON")
                })
            fs.readFile(__dirname + `/../files/${params.postcode}/catalog.json`, (err, data) => {
                let file_data = JSON.parse(data);
                let should_push = true;
                for(let i = 0; i < file_data["dcat:dataset"].length; i++){
                    if (file_data["dcat:dataset"][i]["dcat:distribution"][0]["dcat:accessUrl"] === `http://smartflanders.ilabt.imec.be/graph/${params.postcode}/gebouwen${JSON.parse(gebouwId).gebouw.objectId}.json`){
                        should_push = false;
                        break;
                    }
                }
                if (should_push) {
                    file_data["dcat:dataset"].push({
                        "@type": "dcat:Dataset",
                        "dcat:keyword": "http://data.vlaanderen.be/ns/gebouw#Gebouw",
                        "dcat:distribution": [{
                            "@type": "dcat:Distribution",
                            "dcat:accessUrl": `http://smartflanders.ilabt.imec.be/graph/${params.postcode}/gebouwen${JSON.parse(gebouwId).gebouw.objectId}.json`,
                            "dcat:mediaType": "text/html"
                        }]
                    });
                }

                fs.writeFile(__dirname + `/../files/${params.postcode}/catalog.json`, JSON.stringify(file_data), err => {
                    if (err) throw new Error("Error while adding building to catalog")
                })
                fs.readFile(__dirname + '/../files/master-catalog.json', (err, data) => {
                    if (err) throw new Error("error while reading master-catalog file")
                    let file_data = JSON.parse(data);
                    let contains = false
                    file_data["dcterms:hasPart"].forEach(element => {
                         if(element["foaf:page"] ===  `http://smartflanders.ilabt.imec.be/graph/${params.postcode}/catalog.json`){
                            contains = true;
                         }
                    });
                    if(!contains){
                        file_data["dcterms:hasPart"].push({
                            "foaf:page": `http://smartflanders.ilabt.imec.be/graph/${params.postcode}/catalog.json`,
                            "@type": "dcat:Catalog"
                        });
                        fs.writeFile(__dirname + '/../files/master-catalog.json', JSON.stringify(file_data), err => {
                            if (err) throw new Error("Error while writing files");
                        })
                    }
                })
            })
        }

    })
    return jsonLDBuilding(JSON.parse(gebouwDetails).identificator.objectId, JSON.parse(gebouwId).adressen[0].objectId, lambertToWGS(JSON.parse(gebouwId).geometriePunt.point.coordinates[0], JSON.parse(gebouwId).geometriePunt.point.coordinates[1]))
};

/**
 * Adds a service
 * @param {number} gebouwEenheidID
 */
exports.makeService = async (params) => {
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
    return jsonLDService(params.id, params.name, params.description, params.productType, params.telephone, params.email, openingHours)
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
        "@type": "gebouw:Gebouw",
        "gebouw:Gebouw.adres": {
            "@id": "http://data.vlaanderen.be/id/adres/" + adresId,
            "@type": "http://www.w3.org/ns/locn#Address",
            "http://www.w3.org/2003/01/geo/wgs84_pos#location": {
                "@type": "http://www.w3.org/2003/01/geo/wgs84_pos#Point",
                "http://www.w3.org/2003/01/geo/wgs84_pos#lat": location[1],
                "http://www.w3.org/2003/01/geo/wgs84_pos#long": location[0]
            }
        }
    }
}

function createCatalogFileForCity(postcode, gebouwId) {
    return `{
        "@context": {
            "dcat": "https://www.w3.org/ns/dcat#",
            "dcterms": "http://purl.org/dc/terms/",
            "foaf": "http://xmlns.com/foaf/0.1/"
        },
        "@type": "dcat:Catalog",
        "dcterms:license": [{
            "@id": "https://creativecommons.org/publicdomain/zero/1.0/"
        }],
        "dcat:dataset": [{
                "@type": "dcat:Dataset",
                "dcat:keyword": "http://schema.org/Service",
                "dcat:distribution": [{
                  "@type": "dcat:Distribution",
                  "dcat:accessUrl": "http://smartflanders.ilabt.imec.be/graph/service-example.json",
                  "dcat:mediaType": "text/html"
                }]
            },
            {
                "@type": "dcat:Dataset",
                "dcat:keyword": "http://purl.org/vocab/cpsv#PublicService",
                "dcat:distribution": [{
                  "@type": "dcat:Distribution",
                  "dcat:accessUrl": "http://smartflanders.ilabt.imec.be/graph/service-example.json",
                  "dcat:mediaType": "text/html"
                }]
            },
            {
                "@type": "dcat:Dataset",
                "dcat:keyword": "http://data.vlaanderen.be/ns/gebouw#Gebouw",
                "dcat:distribution": [{
                  "@type": "dcat:Distribution",
                  "dcat:accessUrl": "http://smartflanders.ilabt.imec.be/graph/${postcode}/gebouwen/${gebouwId}.json",
                  "dcat:mediaType": "text/html"
                }]
            }
        ]
    }`
}

/**
 *  Generates a JSON-LD service file based on the given URIs
 * @param {number} gebouwId
 * @param {number} adresId
 * @param {number} location
 */
function jsonLDService(id, name, description, productType, telephone, email, openingHours) {
    let jsonLD = [{
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
    if (typeof id !== "undefined") {
        jsonLD[0]["@id"] = id;
        jsonLD[1]["@id"] = id;
    }

    return jsonLD;
}