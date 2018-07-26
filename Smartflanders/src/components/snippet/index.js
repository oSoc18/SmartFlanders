import React, {Component} from 'react'

export class Snippet extends Component {
    render() {
        return (
            <div className="snippet">
                <h3>JSON-LD snippet</h3>
                <p>Kopieer deze snippet en plaats deze in de html van de webpagina van het gebouw</p>
                <pre>
                    {JSON.stringify(this.props.jsonld, null, 4)}
                </pre>
            </div>
        )
    }
}
