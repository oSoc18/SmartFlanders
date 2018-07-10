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
 * @param {string} - Route path
 * 
 */
app.post('/transform', (req, res) => {
        transformer.transformer(req.body).then((result) => {
            res.send(result);
        }).catch((err) => { 
            err.message = "Transformer failed"
        })      
});
app.use(function(err, req, res, next) {
    res.status(500).send({status:500, message: err.message, type:'internal'}); 
  })

/**
 * 
 * Server listener
 * @param {number} - Port number
 */
app.listen(3000, () => console.log('Example app listening on port 3000!'))