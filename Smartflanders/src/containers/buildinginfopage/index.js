import React, {Component} from 'react'
import { BuildingInfo } from '../../components/buildinginfo'
import { Services } from '../../components/services'
import { Snippet } from '../../components/snippet'
import { connect } from 'react-redux'

export class BuildingInfoPage extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <div className="building">
                <BuildingInfo />  
                <Services title="hallo"/>    
                <Snippet />      
            </div>
        )
    }
}