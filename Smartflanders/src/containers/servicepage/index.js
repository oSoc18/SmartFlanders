import React, {Component} from 'react'
import {ServiceForm} from '../../components/serviceform'
import axios from 'axios'

export class ServicePage extends Component {
    constructor(props){
        super(props)
        this.state = {
            gebouwen: {},
            formSend: false,
            gebouwId : decodeURIComponent(this.props.location.pathname.match(new RegExp("^\/.*\/(.+)"))[1])
        }
        this.handleSubmit = this.handleSubmit.bind(this)
       
    }
    handleSubmit(e){
        e.preventDefault();
        let _data = new FormData(e.target);
        var object = {};
        _data.forEach(function(value, key){
            object[key] = value;
        });
        object.postcode = localStorage.getItem('postcode');
        axios({url:'http://localhost:3001/services/', data: object, method:'POST'}).then( res => {
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
            { this.state.formSend ? (<pre>
                {JSON.stringify(this.state.jsonld, null, 4)}
            </pre>
            ): <ServiceForm handleSubmit={this.handleSubmit} gebouwId={this.state.gebouwId}/>}
                </div>
            </div>
        )
    }
}