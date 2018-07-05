const express = require('express');
const app = express();
const N3 = require('n3');
const csv = require('node-csv').createParser();
const { DataFactory } = N3;
const { namedNode, literal, defaultGraph, quad } = DataFactory;
const store = N3.Store();

/**
 * Parsing the csv file and filling the data object
 * @param {string} - Path of CSV file
 * 
 */
csv.mapFile('./ToevlaExport_20180531.csv', function(err, data) {
    
  console.log(data[0].AccommodatieNaam);
  store.addQuad(
    namedNode('http://example.org/public-buildings#' + data[0].AccommodatieNaam),
    namedNode('http://dbpedia.org/ontology/elevatorCount'),
    literal(0))
});
/**
 * @param {string} - Route path
 * 
 */
app.get('/', (req, res) => {
    
    res.send(store.getQuads());
})

/**
 * 
 * Server listener
 * @param {number} - Port number
 */
app.listen(3000, () => console.log('Example app listening on port 3000!'))