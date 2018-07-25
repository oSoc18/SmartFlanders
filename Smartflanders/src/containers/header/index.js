import  React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class Header extends Component {
    constructor(props) {
        super(props)
    }
    render () {
        return ( 
            <header>
                <a href="https://smartflanders.ilabt.imec.be/" class="logo">
                    <img src="https://raw.githubusercontent.com/oSoc18/SmartFlanders-blog/master/images/logo-smartflanders.png" />
                    <p>Smart Flanders</p>
                </a>
                <div className="nav">
		    <a href="https://smartflanders.ilabt.imec.be/">Home</a>
		    <a target="_blank" rel="noopener noreferrer" href="https://osoc18.github.io/SmartFlanders-blog">Blog</a>
                </div>
            </header>
        )
    }
}
