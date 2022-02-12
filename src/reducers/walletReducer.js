// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  ADD_CURRENCIES,
  ADD_EXPENSES,
  REMOVE_EXPENSES,
  EDIT_EXPENSE,
} from '../actions/walletActions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  edit: [],
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
  case REMOVE_EXPENSES:
    // console.log(state.expenses.map((item) => item.id));
    // console.log(state.expenses.filter((item) => item.id !== action.payload));
    return {
      ...state,
      expenses: state.expenses.filter((item) => item.id !== action.payload),
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      edit: action.payload,
    };
  default:
    return state;
  }
};

export default walletReducer;
