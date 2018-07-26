const validator = require("validator")
const transformer = require("../helpers/transformer")

let json = []

exports.getOpeningHours = (openingHours) => {

  Object.keys(openingHours).forEach((element, index) => {
    let hours = Object.values(openingHours)[index];
    if((hours[0] != "") && (hours[1] != "") && (hours[2] != "") && (hours[3] != "")) {
      json.push({
        "@type": "OpeningHoursSpecification",
        "closes": Object.values(openingHours)[index][1],
        "dayOfWeek": "http://schema.org/" + capitalizeFirstLetter(element),
        "opens": Object.values(openingHours)[index][0]
      }, {
        "@type": "OpeningHoursSpecification",
        "closes": Object.values(openingHours)[index][3],
        "dayOfWeek": "http://schema.org/" + capitalizeFirstLetter(element),
        "opens": Object.values(openingHours)[index][2]
      })
    }
    });
  return {
    "openingHoursSpecification": json
  }


}


function capitalizeFirstLetter(chars) {
  return chars[0].toUpperCase() + chars.slice(1);
}
