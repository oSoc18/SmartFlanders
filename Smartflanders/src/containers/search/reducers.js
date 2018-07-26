const gebouw = (state = {} ,action) => {
    switch(action.type){
        case 'ADD_GEBOUW' :
            return Object.assign({}, {gebouw : action.gebouw} )
        case 'ADD_GEBOUWID' :
            return Object.assign({}, state, {gebouwId: action.gebouwId})
        case 'ADD_VOLLEDIG_ADRES' :
            return Object.assign({}, state, {volledigAdres: action.volledigAdres})
        case 'ADD_ADRESID' :
            return Object.assign({},state, {adresId :action.adresId} )
        default : return state
    }
}

export default gebouw