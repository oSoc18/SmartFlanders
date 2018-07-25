import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { ServiceBox } from '../../components/servicebox'

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
                <div className=".flexcontainer">
                    <ServiceBox />
                    <ServiceBox />
                    <ServiceBox />
                </div>
                <p>hier moeten serviceboxes komen woehoeeee</p>
                <button className="btn">
                    <Link to="/service">Voeg nieuwe service toe</Link>
                </button>
            </div>
        )
    }
}