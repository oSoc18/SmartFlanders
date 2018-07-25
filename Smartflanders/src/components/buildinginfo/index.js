import React, {Component} from 'react'

export class BuildingInfo extends Component {
    render() {
        const lat = this.props.gebouw["gebouw:Gebouw.adres"]["http://www.w3.org/2003/01/geo/wgs84_pos#location"]["http://www.w3.org/2003/01/geo/wgs84_pos#lat"]
        const long = this.props.gebouw["gebouw:Gebouw.adres"]["http://www.w3.org/2003/01/geo/wgs84_pos#location"]["http://www.w3.org/2003/01/geo/wgs84_pos#long"]
	    const boxSize = 0.01;
	    let url = "https://www.openstreetmap.org/export/embed.html?bbox=bbLonMin%2CbbLatMin%2CbbLonMax%2CbbLatMax&layer=mapnik&marker=latitude%2Clongitude";
	    url = url.replace("bbLatMin", lat - boxSize);
	    url = url.replace("bbLonMin", long - boxSize);
	    url = url.replace("bbLatMax", lat + boxSize);
	    url = url.replace("bbLonMax", long + boxSize);
	    url = url.replace("longitude", long);
	    url = url.replace("latitude", lat);
        console.log(url)
        return (
            <div className="buildinginfo">
                <h3>Gebouwinformatie</h3>
                <div className="info">
                    <p><b>{this.props.volledigAdres}</b></p>
                    <p>ID van het gebouw: {this.props.gebouwID} </p>
                    <p>ID van het adres: {this.props.adresID}</p>
                    <iframe className="iframe" src={url} sandbox="allow-scripts" id="map"></iframe>
                    <button className="btn">Bekijk op OASIS</button>
                </div>  
            </div>
        )
    }
}
