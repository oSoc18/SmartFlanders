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
                    <Link className="link" to="/">
                        <img src = 'https://raw.githubusercontent.com/oSoc18/SmartFlanders-blog/master/images/logo-smartflanders.png' />
                        <p>Smart Flanders</p>
                    </Link>
                    <div className="nav">
                        <Link className="link" to="/">Start</Link>
                        <Link className="link" to="/about" >About</Link>
                    </div>
                    <h2>Gebouwenregister SmartFlanders</h2>
                </div>
            </header>
        )
    }
}