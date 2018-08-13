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
    const RandomColor = () => {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
       return color;
    }
    const background = RandomColor()
    const addDeck = await saveDeckTitle(title, background).then(response => response)
    return ({
        type: ADD_DECK,
        payload: {title, background}
    })
}

export const addCardAPI = async (data) => {
    await addCardToDeck(data.deck,{question: data.question, answer: data.answer, correctAnswer: data.correctAnswer}).then(response => response)
    return ({
        type: ADD_CARD,
        payload: {data}
    })
}