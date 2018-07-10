const validator = require('validator')
const transformer = require('../helpers/transformer')

module.exports = async (params) => {
      let response = await transformer(params)
      return response
}

