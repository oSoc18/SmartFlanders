import {combineReducers} from 'redux'
function buildings(state = {}, action) {
    console.log('Hi from the reducer')
}

const rootReducer = combineReducers({
    buildings,
})​
export default rootReducer