const express = require('express');
const app = express();
const body = require('body-parser');
const morgan = require('morgan')
const cors = require('cors');
const routes = require('./routes')

// --- Middlewere
app.use(body.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors())

// --- Routes
app.use('/transform', routes)

//
app.use(function(err, req, res, next) {
    if(!err.message) err.message = "General error"
    res.status(500).send({status:500, message: err.message, type:'internal'}); 
  })

/**
 * 
 * Server listener
 * @param {number} - Port number
 */
app.listen(3000, () => console.log('SmartFlanders is running on port 3000'))