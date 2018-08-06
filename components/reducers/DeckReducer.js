import {GET_DECKS, ADD_DECK } from '../actions/actionTypes'

const DeckReducer = (state=[], action) => {
    switch (action.type){
        case GET_DECKS:
         console.log(action.payload)
         return action.payload
        case ADD_DECK: 
            console.log(action.payload)
            return {...state, 
                 [action.payload]: {
            title: action.payload,
            questions: []
        }
            
            }
        default:
        return state
    }
}

export default DeckReducer