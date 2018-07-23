import React, {Component} from 'react'
import SPARQL from 'sparql-client-2';


export class SearchBuildings extends Component {
    constructor(props){
        super(props)
        this.state = {
            postcode: 0,
            street: null,
            number: null

        };
        this.sparql = new SPARQL.SparqlClient('https://data.vlaanderen.be/sparql')
        this.handleChangeStreet = this.handleChangeStreet.bind(this)
        this.handleChangeNumber = this.handleChangeNumber.bind(this)
    }
    handleChangeStreet(e){
        this.setState({street: e.target.straatnaam})
        let response = await sparql.query(`
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        SELECT distinct ?naamlabel  WHERE {
        ?adres <http://data.vlaanderen.be/ns/adres#postinfo> "${this.state.postcode}" ^^ xsd:string.
        ?adres <http://data.vlaanderen.be/ns/adres#heeftStraatnaam> ?naam.
        ?naam rdfs:label ?naamlabel.
        filter(STRSTARTS(str(?naamlabel),"${this.state.street}")).
}
LIMIT 1000`).execute();
    }

    render() {
        return (
            <div className="content">
             <div className="container">
                    <h3>Gebouw zoeken via adres</h3>
                        <form>
                            <label className="label" for="postcode">Postnummer: </label>
                            <input className="input-text" type="number" name="postcode" required min="1000" max="9992" value={this.state.postcode} />
                            <label className="label" for="street">Straat: </label>
                            <input className="input-text" type="text" name="street" required value={this.state.straatnaam} onChange={this.handleChangeStreet}/>
                            <label className="label" for="number">Huisnummer: </label>
                            <input className="input-text" type="number" name="number" required  value={this.state.huisnummer}/>
                            <button className="button" type="submit">Zoeken </button>
                        </form>
            </div>
            </div>
        )
    }
}