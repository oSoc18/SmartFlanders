const express = require('express');
const app = express();

const body = require('body-parser');
const morgan = require('morgan')
const cors = require('cors');
const transformer = require('./transfromer')

app.use(body.urlencoded());
app.use(morgan('dev'));
app.use(cors())
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
app.post('/transform', (req, res) => {
        transformer.transformer(req.body).then((result) => {
            res.send(result);
        }).catch((err) => { })      
})

/**
 * 
 * Server listener
 * @param {number} - Port number
 */
app.listen(3000, () => console.log('Example app listening on port 3000!'))