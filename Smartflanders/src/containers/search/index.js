import React, {Component} from 'react'
import { SearchBuildings } from '../../components/search-buildings-form'
import { connect } from 'react-redux'

class Search extends Component {
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount(){

    }
    handleSubmit() {
        
    }

    render() {
        return (
            <div>
                <SearchBuildings />    
            </div>
        )
    }
}
export default connect(mapStateToProps)(AsyncApp)