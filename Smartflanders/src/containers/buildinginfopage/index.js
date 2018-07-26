import React, {Component} from 'react'
import { BuildingInfo } from '../../components/buildinginfo'
import { Services } from '../../components/services'
import { Snippet } from '../../components/snippet'
import {connect } from 'react-redux'
import axios from 'axios'

class BuildingInfoPage extends Component {
    render() {
        return (
            <div className="building">
                <BuildingInfo gebouwID={this.props.gebouwID || this.props.reduxGebouwId} gebouw={this.props.snippet || this.props.reduxSnippet} adresID={this.props.adresID || this.props.reduxAdresId} volledigAdres={this.props.volledigAdres || this.props.reduxVolledigAdres}/>  
                <Services   gebouwId={this.props.gebouwID || this.props.reduxGebouwId} />    
                <Snippet    jsonld={this.props.snippet || this.props.reduxSnippet}/>      
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
      reduxSnippet : state.gebouw.gebouw,
      reduxGebouwId : state.gebouw.gebouwId,
      reduxVolledigAdres : state.gebouw.volledigAdres,
      reduxAdresId : state.gebouw.adresId
    }
  }
export default connect(mapStateToProps)(BuildingInfoPage)