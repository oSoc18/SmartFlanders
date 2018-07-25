import React, {Component} from 'react'

export class BuildingInfo extends Component {
    render() {
        const lat = this.props.gebouw["gebouw:Gebouw.adres"]["http://www.w3.org/2003/01/geo/wgs84_pos#location"]["http://www.w3.org/2003/01/geo/wgs84_pos#lat"]
        const long = this.props.gebouw["gebouw:Gebouw.adres"]["http://www.w3.org/2003/01/geo/wgs84_pos#location"]["http://www.w3.org/2003/01/geo/wgs84_pos#long"]
	let regexLat = new RegExp('longitude', 'g');
	let regexLon = new RegExp('latitude', 'g');
        return (
            <div className="buildinginfo">
                <h3>Gebouwinformatie</h3>
                <div className="info">
                    <p>Adres: {this.props.volledigAdres}</p>
                    <p>ID van het gebouw: {this.props.gebouwID} </p>
                    <p>ID van het adres: {this.props.adresID}</p>
                    <iframe className="iframe" src="'https://www.openstreetmap.org/export/embed.html?bbox=latitude%2Clongitude%2Clatitude%2Clongitude&amp;layer=mapnik&amp;marker=longitude%2Clatitude'.replace(regexLat, lat).replace(regexLon, long)" sandbox="allow-scripts" id="map"></iframe>
                    <button className="btn">Bekijk op OASIS</button>
                </div>  
            </div>
        )
    }
}
