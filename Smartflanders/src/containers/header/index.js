import  React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class Header extends Component {
    constructor(props) {
        super(props)
    }
    render () {
        return ( 
            <header>
                <Link className="logo" to="/">
                    <img src="https://raw.githubusercontent.com/oSoc18/SmartFlanders-blog/master/images/logo-smartflanders.png" />
                    <p>Smart Flanders</p>
                </Link>
                <div className="nav">
                    <Link to="/">Home</Link>
		    <a target="_blank" href="https://osoc18.github.io/SmartFlanders-blog">Blog</a>
                </div>
            </header>
        )
    }
}
