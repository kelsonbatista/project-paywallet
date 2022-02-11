// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ADD_CURRENCIES, ADD_EXPENSES } from '../actions/walletActions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
      // nesse item preciso adicionar tudo o que ja existe em expenses para adicionar um novo item
      // fazer spread dentro do expenses serve para acumular valores toda vez que é adicionado
    };
  default:
    return state;
  }
};

export default walletReducer;
