import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export class Homepage extends Component {
    render() {
      return (
        <div className="content">
        <div className="intro">
            <p>Zoek een gebouw in uw stad en voeg de informatie over dit gebouw toe aan de datacatalogus.</p>
            <a className="button"><Link to="search-building">Zoek gebouw</Link></a></div>
        </div>
      );
    }
  }

