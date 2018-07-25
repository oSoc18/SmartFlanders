import React, {Component} from 'react'

export class Snippet extends Component {
    render() {
        return (
            <div className="snippet">
               {JSON.stringify(this.props.jsonld, null, 4)}
            </div>
        )
    }
}