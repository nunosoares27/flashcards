import { GET_DECKS, ADD_DECK } from './actionTypes'
import { getDecks, saveDeckTitle } from '../../utils/api'

export const getDecksAPI = async() => {
    const decksData =  await getDecks().then(response => response)
    return ({
        type: GET_DECKS,
        payload: decksData
    })
}

export const addDeckAPI = async (title) => {
    const addDeck = await saveDeckTitle(title).then(response => response)
    return ({
        type: ADD_DECK,
        payload: title
    })
}