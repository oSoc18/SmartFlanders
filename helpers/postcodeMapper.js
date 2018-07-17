const https = require('https');
let adressen = [];
startMapping();
async function startMapping(){
    console.log('started')
    await fetchAddresses("https://basisregisters.vlaanderen.be/api/v1/adressen?Postcode=9300");
    console.log(addressen)
}

async function fetchAddresses(url){
    let _adressen = JSON.parse(await fetch(url))
    _adressen.adressen.forEach(element => {
        adressen.push(element.identificator.objectId)
    })
    if(_addressen.volgende){
        await fetchAddresses(_addressen.volgende);
    } 
}

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