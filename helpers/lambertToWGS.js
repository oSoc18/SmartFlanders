let proj4 = require('proj4');

module.exports = function lambert93toWGPS(lambertE, lambertN) {
    
    var firstProjection = '+proj=lcc +lat_1=51.16666723333333 +lat_2=49.8333339 +lat_0=90 +lon_0=4.367486666666666 +x_0=150000.013 +y_0=5400088.438 +ellps=intl +towgs84=-106.869,52.2978,-103.724,0.3366,-0.457,1.8422,-1.2747 +units=m +no_defs';
    var secondProjection = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";
    return proj4(firstProjection,secondProjection,[lambertE, lambertN])
}
