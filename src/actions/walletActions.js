import exchangeRatesAPI from '../services/exchangeRatesAPI';
// Coloque aqui suas actions
export const ADD_CURRENCIES = 'ADD_CURRENCIES';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const REMOVE_EXPENSES = 'REMOVE_EXPENSES';

export const addCurrencies = (payload) => ({
  type: ADD_CURRENCIES,
  payload,
});

export const addExpenses = (payload) => ({
  type: ADD_EXPENSES,
  payload,
});

export const removeExpenses = (payload) => ({
  type: REMOVE_EXPENSES,
  payload,
});

export const getCurrencies = () => {
  console.log('request API');
  return async (dispatch) => {
    // console.log(dispatch, 'dispatch');
    const rates = await exchangeRatesAPI();
    dispatch(addCurrencies(rates));
  };
};
