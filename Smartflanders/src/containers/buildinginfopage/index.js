import React, {Component} from 'react'
import { BuildingInfo } from '../../components/buildinginfo'
import { Services } from '../../components/services'
import { Snippet } from '../../components/snippet'
import { connect } from 'react-redux'

export class BuildingInfoPage extends Component {
    constructor(props){
        super(props)
        console.log(this.props.gebouw)
    }

    render() {
        return (
            <div className="building">
                <BuildingInfo gebouwId={this.props.gebouwId} volledigAdres={this.props.volledigAdres}/>  
                <Services  />    
                <Snippet jsonld={this.props.gebouw} />      
            </div>
        )
    }
}