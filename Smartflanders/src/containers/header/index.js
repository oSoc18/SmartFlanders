import  React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class Header extends Component {
    constructor(props) {
        super(props)
    }
    render () {
        return ( 
            <header>
                <div className="header">
                    <img href="" src = 'https://raw.githubusercontent.com/oSoc18/SmartFlanders-blog/master/images/logo-smartflanders.png' />
                <div className="nav">
                    <Link className="link" to="/">Start</Link>
                    <Link className="link" to="/service">Service </Link>
                 </div>
                    <h1>Smart Flanders </h1> 
                    <h2>Gebouwenregister SmartFlanders</h2>
                    </div>
            </header>
        )
    }
}