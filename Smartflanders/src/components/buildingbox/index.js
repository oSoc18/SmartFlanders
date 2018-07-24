import React, {Component} from 'react'

export class BuildingBox extends Component{
render() {
    return (
            <div className="building-box">
            {this.props.adres.volledigAdres.geografischeNaam.spelling}
            <button className="btn" id="adres-submit" onClick={(e) => {this.props.onAdresSubmit(e, this.props.adres.identificator.objectId)}}>Selecteer</button>
            </div>
        )
    }
}

