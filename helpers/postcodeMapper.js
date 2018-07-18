const https = require('https');
const fs = require('fs');
let adressen = [];
startMapping();
async function startMapping(){
    console.log('started')
    await fetchAddresses("https://basisregisters.vlaanderen.be/api/v1/adressen?Postcode=9300&limit=300");
    fs.writeFile('./aalst.json', JSON.parse(adressen), err => {
        console.error(err);
    });
}

async function fetchAddresses(url){
    let _adressen = JSON.parse(await fetch(url))
    _adressen.adressen.forEach(element => {
        adressen.push(element.identificator.objectId)
    })
    if(_adressen.volgende){
        await fetchAddresses(_adressen.volgende);
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