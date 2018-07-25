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
            foundBuilding: false,
            foundAdres: false,
            gebouw: {},
            adresIDadresID: "",
            gebouwID: "",
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
                gebouw: data,
                foundBuilding: true,
                foundAdres: false, 
                volledigAdres: volledigAdres,
                adresID: data.data["gebouw:Gebouw.adres"]["@id"], 
                gebouwID: "http://data.vlaanderen.be/id/gebouw/" + data.data["@id"].match(new RegExp("^.*:([0-9]+)"))[1]
            })
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
          localStorage.setItem('postcode', e.target.postcode.value)
    }

    render() {
        let adressen;
        if(this.state.adressen){
             adressen = this.state.adressen.map((adres, key) => {
            return <BuildingBox adres={adres} key={key} onAdresSubmit={this.handleAdresSubmit}/>
    });}
        return (
            <div>
                { this.state.adressen ? null :(        
                <div className="home">
                        <h1>Gebouwenregister</h1>
                        <h2>Structureer en deel informatie over publieke gebouwen en diensten voor uw lokaal bestuur</h2>
                    <div className="search">  
                        <SearchBuildings handleSubmit={this.handleSubmitFromSearch}/> 
                    </div>
                </div>
                )}
                {   this.state.foundAdres ? (<div className="flexcontainer">
                    <h3>We hebben verschillende gebouwen gevonden, gelieve er één te selecteren</h3>
                 {adressen}
                 </div>)
                    : null}
                {this.state.foundBuilding?
                    <BuildingInfoPage snippet={this.state.gebouw.data} volledigAdres={this.state.volledigAdres} gebouwID={this.state.gebouwID} adresID={this.state.adresID}/>: null }
           </div>
        )
    }
}