import React, {Component} from 'react'

export class Lieselot extends Component {
    render() {
        return (
            <div className="buildinginfo">
                mijn mooie naam is: {this.props.naam}
            </div>
        )
    }
}