const express = require('express');
const app = express();
const body = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes');
const path = require('path')
const pug = require('pug');
// --- Middlewere
app.use(body.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors())

// --- Routes
app.use('/transform', routes)

// --- Enable PUG template
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');

//
app.use(function(err, req, res, next) {
    if(!err.message) err.message = "General error"
    res.status(500).send({status:500, message: err.message, type:'internal'}); 
  })

  /**
 * Server listener
 * @param {number} - Port number
 */
app.listen(3000, () => console.log('SmartFlanders is running on port 3000'))