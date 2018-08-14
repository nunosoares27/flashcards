import { GET_DECKS, ADD_DECK, ADD_CARD } from "../actions/actionTypes";

const DeckReducer = (state = [], action) => {
  switch (action.type) {
    case GET_DECKS:
      return action.payload;
    case ADD_DECK:
      return {
        ...state,
        [action.payload.title]: {
          title: action.payload.title,
          background: action.payload.background,
          questions: []
        }
      };
    case ADD_CARD:
      const { question, answer, deck, correctAnswer } = action.payload.data;
      return {
        ...state,
        [deck]: {
          ...state[deck],
          questions: [
            ...state[deck].questions,
            {
              question,
              answer,
              correctAnswer
            }
          ]
        }
      };

    default:
      return state;
  }
};

export default DeckReducer;
