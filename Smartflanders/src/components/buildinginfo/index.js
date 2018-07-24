import React, {Component} from 'react'

export class BuildingInfo extends Component {
    render() {
        return (
            <div className="buildinginfo">
                <div className="info">
                    <p>{this.props.volledigAdres}</p>
                    <p>GebouwID: {this.props.objectID} </p>
                    <p>AdresID: {this.props.adresID}</p>
                    <button className="btn">
                        Bekijk op kaart
                    </button>
                </div>  
                <div className="map">
                    <iframe src="https://www.openstreetmap.org/export/embed.html?bbox=4.39830780029297%2C50.91715804697872%2C4.454956054687501%2C50.94028491659529&amp;layer=mapnik&amp;marker=50.92872291908717%2C4.426631927490234" sandbox="allow-scripts" id="map"></iframe>
                </div>    
            </div>
        )
    }
}