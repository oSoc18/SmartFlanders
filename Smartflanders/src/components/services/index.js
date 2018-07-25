import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { ServiceBox } from '../../components/servicebox'
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
            url: "http://localhost:3001/services/getservices"
        }).then(data => {
            console.log(data);
        })
    }

    render() {
        return (
            <div className="services">
                <h3>Services</h3>
                {this.state.services.map(service => {
                    return (<div> {service["@id"]}</div>)
                })}
                <p>service kaartjes</p>
                <Link to={`/service/${encodeURIComponent(this.props.gebouwId)}`} className="btn">Voeg nieuwe service toe</Link>
            </div>
        )
    }
}