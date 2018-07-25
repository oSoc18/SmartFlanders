import React, {Component} from 'react'
import { SearchBuildings } from '../../components/search-buildings-form'
import { connect } from 'react-redux'
import axios from 'axios'
import {BuildingBox} from '../../components/buildingbox'
import {BuildingInfoPage} from '../buildinginfopage'

export class Search extends Component {
    constructor(props){
        super(props)
        this.state = {
            street : "",
            postcode : 0,
            number: 0,
            gebouwen: null,
            adressen: null,
            gekozenAdres: "",
            foundBuilding: false,
            foundAdres: false,
            gebouw: {},
            volledigAdres: ""
        };
        this.handleSubmitFromSearch = this.handleSubmitFromSearch.bind(this)
        this.handleAdresSubmit = this.handleAdresSubmit.bind(this);
    }
    handleAdresSubmit(e, adresId, volledigAdres){
        e.preventDefault();
        axios.post('http://localhost:3001/gebouwunits', {
            adresObjectId: adresId,
            postcode: this.state.postcode
        }).then(function (data) {
            this.setState({
                gekozenAdres: adresId,
                gebouw: data,
                foundBuilding: true,
                foundAdres: false, 
                volledigAdres: volledigAdres
            });
            
        }.bind(this))
        .catch(err => {
            console.log(err)
        })
    }
    handleSubmitFromSearch(e) {
        e.preventDefault();
        this.setState({
             street: e.target.street.value,
             number: e.target.number.value,
             postcode: e.target.postcode.value
         });
         axios.post('http://localhost:3001/gebouwen', {
            street: e.target.street.value,
             number: e.target.number.value,
             postcode: e.target.postcode.value
          })
          .then(function (response) {
              this.setState({adressen: response.data.adressen, foundAdres: true})
            }.bind(this))
          .catch(function (error) {
              console.log(error)
          });
    }

    render() {
        return (
            <div className="search">  
                { this.state.adressen ? null : <SearchBuildings handleSubmit={this.handleSubmitFromSearch}/>   }
                {this.state.foundAdres ? this.state.adressen.map((adres, key) => {
                return <BuildingBox adres={adres} key={key} onAdresSubmit={this.handleAdresSubmit}/>
                }): null}
                {this.state.foundBuilding?<BuildingInfoPage snippet={this.state.gebouw.data} volledigAdres={this.state.volledigAdres}/>: null }
            </div>
        )
    }
}