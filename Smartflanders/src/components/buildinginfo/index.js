import React, {Component} from 'react'

export class BuildingInfo extends Component {
    render() {
        const lat = this.props.gebouw["gebouw:Gebouw.adres"]["http://www.w3.org/2003/01/geo/wgs84_pos#location"]["http://www.w3.org/2003/01/geo/wgs84_pos#lat"]
        const long = this.props.gebouw["gebouw:Gebouw.adres"]["http://www.w3.org/2003/01/geo/wgs84_pos#location"]["http://www.w3.org/2003/01/geo/wgs84_pos#long"]
        return (
            <div className="buildinginfo">
                <h3>Gebouwinformatie</h3>
                <div className="info">
                    <p>Adres: {this.props.volledigAdres}</p>
                    <p>ID van het gebouw: {this.props.gebouwID} </p>
                    <p>ID van het adres: {this.props.adresID}</p>
                    <iframe className="iframe" src="https://www.openstreetmap.org/export/embed.html?bbox=4.39830780029297%2C50.91715804697872%2C4.454956054687501%2C50.94028491659529&amp;layer=mapnik&amp;marker=50.92872291908717%2C4.426631927490234" sandbox="allow-scripts" id="map"></iframe>
                    <button className="btn">Bekijk op OASIS</button>
                </div>  
            </div>
        )
    }
}