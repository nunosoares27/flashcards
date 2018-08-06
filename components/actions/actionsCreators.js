import { GET_DECKS, ADD_DECK, ADD_CARD } from './actionTypes'
import { getDecks, saveDeckTitle, addCardToDeck } from '../../utils/api'

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

export const addCardAPI = async (data) => {
    console.log('data',data)
    await addCardToDeck(data.deck,{question: data.question, answer: data.answer, correctAnswer: data.correctAnswer}).then(response => response)
    return ({
        type: ADD_CARD,
        payload: {data}
    })
}