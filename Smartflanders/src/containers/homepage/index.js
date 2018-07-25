import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Search } from '../search'
import 'typeface-roboto'

export class Homepage extends Component {
    render() {
      return (
        <div className="home">
          <h1>Gebouwenregister</h1>
          <h2>Structureer en deel informatie over publieke gebouwen en diensten voor uw lokaal bestuur</h2>
          <Search />
        </div>
      );
    }
  }

