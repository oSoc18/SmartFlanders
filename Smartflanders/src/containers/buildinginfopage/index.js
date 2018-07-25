import React, {Component} from 'react'
import { BuildingInfo } from '../../components/buildinginfo'
import { Services } from '../../components/services'
import { Snippet } from '../../components/snippet'
import { connect } from 'react-redux'

export class BuildingInfoPage extends Component {
    render() {
        return (
            <div className="building">
                <BuildingInfo gebouwId={this.props.gebouwId} adresID={this.props.adresID} volledigAdres={this.props.volledigAdres}/>  
                <Services  />    
                <Snippet jsonld={this.props.snippet} />      
            </div>
        )
    }
}