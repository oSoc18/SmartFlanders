import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { ServiceBox } from '../servicebox'
import axios from 'axios'

export class Services extends Component {
    constructor(props){
        super(props)
        this.state = {
            naam: null,
            services: []
        }
    }
    componentDidMount(){
        let _postcode = localStorage.getItem('postcode');
        axios({
            method: 'POST',
            data: {gebouwId: this.props.gebouwId, postcode: _postcode},
            url: "https://smartflanders.ilabt.imec.be/api/services/getservices"
        }).then(data => {
            this.setState({services: data.data})
        })
    }

    render() {
        return (
            <div>
                <h3>Services</h3>
                <div className="service-container">
                {this.state.services.map(service => {
                    return <ServiceBox service={service}/>
                })}
                </div>
                <Link to={`/service/${encodeURIComponent(this.props.gebouwId)}`} className="btn">Voeg nieuwe service toe</Link>
            </div>
        )
    }
}
