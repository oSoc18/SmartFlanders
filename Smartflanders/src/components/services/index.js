import React, {Component} from 'react'

export class Services extends Component {
    constructor(props){
        super(props)
        this.state = {
            naam: null
        }
    }

    render() {
        return (
            <div className="services">
                <h3>Services</h3>
                <p>service kaartjes</p>
                <button>
                    Voeg nieuwe service toe
                </button>
            </div>
        )
    }
}