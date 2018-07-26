import React, {Component} from 'react'

export class BuildingBox extends Component{
render() {
    return (
            <div className="building-box">
           <p> {this.props.adres.volledigAdres.geografischeNaam.spelling}</p>
           
            <button className="btn" id="adres-submit" onClick={(e) => {this.props.onAdresSubmit(e, this.props.adres.identificator.objectId, this.props.adres.volledigAdres.geografischeNaam.spelling)}}>Selecteer</button>
            </div>
        )
    }
}

