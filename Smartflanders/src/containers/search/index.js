import React, {Component} from 'react'
import { SearchBuildings } from '../../components/search-buildings-form'
import {BuildingBox} from '../../components/buildingbox'
import { connect } from 'react-redux'
import axios from 'axios'

export class Search extends Component {
    constructor(props){
        super(props)
        this.state = {
            street : "",
            postcode : 0,
            number: 0,
            gebouwen: null,
            adressen: null,
            gekozenAdres: ""
        };
        this.handleSubmitFromSearch = this.handleSubmitFromSearch.bind(this)
        this.handleAdresSubmit = this.handleAdresSubmit.bind(this);
    }

    handleAdresSubmit(e, adresId){
        console.log(e)
        e.preventDefault();
        axios.post('http://localhost:3001/gebouwunits', {
            adresObjectId: adresId,
            postcode: this.state.postcode
        }).then(function (data) {
            this.setState({
                gekozenAdres: adresId
            });
            console.log(data)
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
        })
        axios.post('http://localhost:3001/gebouwen', {
        street: e.target.street.value,
            number: e.target.number.value,
            postcode: e.target.postcode.value
        })
        .then(function (response) {
            this.setState({adressen: response.data.adressen})
            console.log(this.state);
                    }.bind(this))
        .catch(function (error) {
            console.log(error)
        })
    }

    render() {
        return (
            <div className="search">
                { this.state.adressen ? this.state.adressen.map((adres, key) => {
                    return <BuildingBox adres={adres} key={key} onAdresSubmit={this.handleAdresSubmit}/>
                }) : <SearchBuildings handleSubmit={this.handleSubmitFromSearch}/>   }
            </div>
        )
    }
}