import { GET_DECKS, ADD_DECK, ADD_CARD } from "../actions/actionTypes";

const DeckReducer = (state = [], action) => {
  switch (action.type) {
    case GET_DECKS:
      console.log(action.payload);
      return action.payload;
    case ADD_DECK:
      console.log(action.payload);
      return {
        ...state,
        [action.payload]: {
          title: action.payload,
          questions: []
        }
      };
      case ADD_CARD:
        const {question, answer, deck, correctAnswer} = action.payload
        return {
            ...state,
            [deck]: {
                ...state[deck],
                questions: [...state[deck].questions,
                {
                    question, answer, correctAnswer
                }]
            }
        }
    default:
      return state;
  }
};

export default DeckReducer;
