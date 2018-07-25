import React, {Component} from 'react'

export class Snippet extends Component {
    render() {
        return (
            <div className="snippet">
	       <pre>
                 {JSON.stringify(this.props.jsonld, null, 4)}
               </pre>
            </div>
        )
    }
}
