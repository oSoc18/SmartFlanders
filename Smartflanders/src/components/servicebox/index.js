import React, {Component} from 'react'

export class ServiceBox extends Component{
render() {
    return (
            <div className="service-box">
                <p><h3>{this.props.service.name}</h3></p>
                <p>Beschrijving: {this.props.service.description}</p>
                <p>Producttype: {this.props.service.producttype}</p>
                <p>E-mail: {this.props.service.email}</p>
                <p>Telefoonnummer: {this.props.service.phone}</p>
            </div>
        )
    }
}

