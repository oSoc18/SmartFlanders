import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {ServiceForm} from '../../components/serviceform'
import axios from 'axios'
import { connect } from 'react-redux'

 class ServicePage extends Component {
    constructor(props){
        super(props)
        this.state = {
            gebouwen: {},
            formSend: false,
            gebouwId : decodeURIComponent(this.props.location.pathname.match(new RegExp("^\/.*\/(.+)"))[1])
        }
        
        console.log(this.props)
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
        axios({url:'https://smartflanders.ilabt.imec.be/api/services/', data: object, method:'POST'}).then( res => {
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
            { this.state.formSend ? (<div><pre>
                {JSON.stringify(this.state.jsonld, null, 4)}
            </pre>
            <Link className="btn" to={`/gebouw/`}> Terug  </Link>
            </div>
            ): <ServiceForm handleSubmit={this.handleSubmit} gebouwId={this.state.gebouwId}/>}
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
      gebouw : state.gebouw
    }
  }
export default connect(mapStateToProps)(ServicePage)