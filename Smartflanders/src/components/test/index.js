import React, {Component} from 'react'
import {Lieselot} from './naam'

export class Services extends Component {
    constructor(props){
        super(props)
        this.state = {
            naam: null
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e){
        this.setState({naam: e.target.value})
        console.log(this.state)
    }

    render() {
        return (
            <div className="services">
                <h3>Services</h3>
                <p>service kaartjes</p>
                <button>
                    Voeg nieuwe service toe
                </button>
                {this.state.naam ? <Lieselot naam={this.state.naam}/> : "Er is een naam aanwezig" }
                <input type="text" value={this.state.naam} onChange={this.handleChange} />
            </div>
        )
    }
}