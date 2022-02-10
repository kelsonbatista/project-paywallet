// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_CURRENCIES, GET_EXPENSES } from '../actions';

const INITIAL_STATE = {
  wallet: {
    currencies: [],
    expenses: [],
  },
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES:
    return {
      ...state,
      wallet: {
        currencies: action.payload,
      },
    };
  case GET_EXPENSES:
    return {
      ...state,
      wallet: {
        expenses: action.payload,
      },
    };
  default:
    return state;
  }
};

export default walletReducer;
