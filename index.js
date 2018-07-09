const express = require('express');
const app = express();

/**
 * @param {string} - Route path
 * 
 */
app.get('/', (req, res) => res.send('Hello World!'))

/**
 * 
 * Server listener
 * @param {number} - Port number
 * 
 */
app.listen(3000, () => console.log('Example app listening on port 3000!'))
