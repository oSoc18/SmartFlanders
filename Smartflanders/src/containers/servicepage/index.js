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
        axios.post('http://localhost:3001/service/', e.target).then( data => {
            console.log(data)
            this.setState({
                formSend: true
            })
        })
    }
    render() {
        return (
            { this.state.formSend ? null: <ServiceForm handleSubmit={this.handleSubmit}/>}
        )
    }
}