import React, {Component} from 'react'
import Autocomplete from 'react-autocomplete'
export class SearchBuildings extends Component {
    constructor(props){
        super(props)
        this.state = {
            postcode: 0,
            street: '',
            number: null,
            streets: []

        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangePostcode = this.handleChangePostcode.bind(this)
    }
    handleChangePostcode(e){
        if(e.target.value.length == 4){
        this.setState({streets: []})
        this.setState({ postcode: e.target.value})    
        let query = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
        SELECT distinct ?naamlabel WHERE {
        ?adres a <http://data.vlaanderen.be/ns/adres#Adres> .
        ?adres <http://data.vlaanderen.be/ns/adres#heeftPostinfo> ?postinfo .
        ?postinfo <http://data.vlaanderen.be/ns/adres#postcode> "${this.state.postcode}"^^xsd:string .
        ?adres <http://data.vlaanderen.be/ns/adres#heeftStraatnaam> ?naam.
        ?naam rdfs:label ?naamlabel.
    }`
        fetch("https://data.vlaanderen.be/sparql?query=" + encodeURIComponent(query), {
            headers: {
                "accept":"application/sparql-results+json",
                }
            }).then(data => {
                return data.json();                
            }).then(blob => {
                let _data = [];
                console.log(blob.results.bindings.length)
            for (let i = 0; i < blob.results.bindings.length; i++) {
                _data.push(blob.results.bindings[i].naamlabel.value);
            }
                this.setState({streets: _data})
            });
            
        }
    }

    handleSubmit(e){
        e.preventDefault();
        console.log('before sparql');
        

            }    
    render() {
        return (
            <div className="content">
             <div className="container">
                    <h3>Gebouw zoeken via adres</h3>
                        <form onSubmit={this.handleSubmit}>
                            <label className="label" for="postcode">Postcode: </label>
                            <input className="input-text" type="number" name="postcode" required min="1000" max="9992" onChange={this.handleChangePostcode}/>
                            <label className="label" for="street">Straat: </label>
                            <Autocomplete
                                    inputProps={{ className: "input-text" }}
                                    wrapperStyle={{ position: 'relative' }}
                                    getItemValue={(item) => item.trim()}
                                    items={this.state.streets}
                                    renderItem={(item, isHighlighted) =>
                                        <div style={{ background: isHighlighted ? 'lightgray' : 'white' }} key={item}>
                                        {item}
                                        </div>
                                    }
                                    sortItems= { (a, b, value) => { const aLower = a.toLowerCase()
                                        const bLower = b.toLowerCase()
                                        const valueLower = value.toLowerCase()
                                        const queryPosA = aLower.indexOf(valueLower)
                                        const queryPosB = bLower.indexOf(valueLower)
                                        if (queryPosA !== queryPosB) {
                                          return queryPosA - queryPosB
                                        }
                                      return aLower < bLower ? -1 : 1} }
                                    shouldItemRender= { (item, value) => {return   item.toLowerCase().indexOf(value.toLowerCase()) !== -1 }}
                                    value={this.state.street}
                                    onChange={(event, value) => this.setState({street: value}) }
                                    onSelect={(val) => this.setState({street: val})}
                                    name="street"
                                    />
                            <label className="label" for="number">Huisnummer: </label>
                            <input className="input-text" type="number" name="number" required />
                            <button className="button" type="submit">Zoeken </button>
                        </form>
            </div>
        </div>

        )
    }
}