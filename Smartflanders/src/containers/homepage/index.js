import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export class Homepage extends Component {
    render() {
      return (
        <div className="content">
          <div className="intro">
            <h3>Structureer en deel informatie over publieke gebouwen en diensten voor uw lokaal bestuur</h3>
            <a className="button"><Link to="search-building">Zoek gebouw</Link></a>
          </div>
        </div>
      );
    }
  }

