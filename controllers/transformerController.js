const validator = require('validator')
const transformer = require('../helpers/transformer')

// TODO figure out how catch works, making sure that error middleware in index.js passes the correct message

/**
 *  Validates user input
 * @param {Object} params 
 */
module.exports = async (params) => {
      try {
            if (!validator.isPostalCode(params.postcode, 'BE')) throw new Error("Postcode is niet correct");
            if (!validator.isLength(params.street, {
                        min: 1,
                        max: 40
                  })) throw new Error("Straat is niet correct");
            if (!validator.isInt(params.number, {
                        min: 1,
                        max: 10000
                  })) throw new Error("Huisnummer is niet correct");
            let response = await transformer(params);
            return response
      } catch (error) {
            console.log(error.name + ': ' + error.message);
            throw new Error(error.message)
      }
}