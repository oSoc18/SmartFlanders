import React, {Component} from 'react'
import { BuildingInfo } from '../../components/buildinginfo'
import { Services } from '../../components/services'
import { Snippet } from '../../components/snippet'
import axios from 'axios'

export class BuildingInfoPage extends Component {
    constructor(props){
        super(props);
        if(this.props.location){
            axios({
                method: 'POST',
                url: '/gebouwunits',
                data: this.props.location.pathname
            }).then(response => {
                this.setState({

                })
            })
        }

    }
    render() {
        return (
            <div className="building">
                <BuildingInfo gebouwID={this.props.gebouwID || this.state.gebouwID} gebouw={this.props.snippet || this.state.snippet} adresID={this.props.adresID || this.state.adresID} volledigAdres={this.props.volledigAdres || this.state.volledigAdres}/>  
                <Services   gebouwId={this.props.gebouwID || this.state.gebouwID} />    
                <Snippet    jsonld={this.props.snippet || this.state.snippet}/>      
            </div>
        )
    }
}