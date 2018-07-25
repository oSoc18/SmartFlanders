import React, {Component} from 'react'
import {ServiceForm} from '../../components/serviceform'
import axios from 'axios'

export class ServicePage extends Component {
    constructor(props){
        super(props)
        this.state = {
            gebouwen: {},
            formSend: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(e){
        e.preventDefault();
        let data = new FormData(e.target);
        axios.post('http://localhost:3001/services/', data).then( res => {
            console.log(res.data)
            this.setState({
                formSend: true,
                jsonld: res.data
            })
        })
    }
    render() {
        return (
            <div className="content">
            <div className="container">
            { this.state.formSend ? "We hebben de service correct toegevoegd": <ServiceForm handleSubmit={this.handleSubmit}/>}
            </div>
            </div>
        )
    }
}