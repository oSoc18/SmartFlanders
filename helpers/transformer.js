const https = require("https");
const matcher = require("./matcher");
const lambertToWGS = require("./lambertToWGS");
const fs = require('fs');
const path = require('path')
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
                        JSON.stringify(jsonLD(JSON.parse(gebouwDetails).identificator.objectId, JSON.parse(gebouwId).adressen[0].objectId,
                            lambertToWGS(JSON.parse(gebouwId).geometriePunt.point.coordinates[0], JSON.parse(gebouwId).geometriePunt.point.coordinates[1]))),
                        err => {
                            if (err) throw new Error("Error whiel writing building JSON")
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
                        JSON.stringify(jsonLD(JSON.parse(gebouwDetails).identificator.objectId, JSON.parse(gebouwId).adressen[0].objectId,
                            lambertToWGS(JSON.parse(gebouwId).geometriePunt.point.coordinates[0], JSON.parse(gebouwId).geometriePunt.point.coordinates[1]))),
                        err => {
                            if (err) throw new Error("Error whiel writing building JSON")
                        })
            fs.readFile(__dirname + `/../files/${params.postcode}/catalog.json`, (err, data) => {
                let file_data = JSON.parse(data)
                file_data["dcat:dataset"].push({
                    "@type": "dcat:Dataset",
                    "dcat:keyword": "http://data.vlaanderen.be/ns/gebouw#Gebouw",
                    "dcat:distribution": [{
                        "@type": "dcat:Distribution",
                        "dcat:accessUrl": `http://smartflanders.ilabt.imec.be/graph/${JSON.parse(gebouwId).gebouw.objectId}.json`,
                        "dcat:mediaType": "text/html"
                    }]
                });
                fs.writeFile(__dirname + `/../files/${params.postcode}/catalog.json`, JSON.stringify(file_data), err => {
                    if (err) throw new Error("Error while adding building to catalog")
                })
            })
        }

    })
    return jsonLD(JSON.parse(gebouwDetails).identificator.objectId, JSON.parse(gebouwId).adressen[0].objectId, lambertToWGS(JSON.parse(gebouwId).geometriePunt.point.coordinates[0], JSON.parse(gebouwId).geometriePunt.point.coordinates[1]))
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
                  "dcat:accessUrl": "http://smartflanders.ilabt.imec.be/graph/${postcode}/${gebouwId}.json",
                  "dcat:mediaType": "text/html"
                }]
            }
        ]
    }`
}