const API_URL = 'https://economia.awesomeapi.com.br/json/all';

const exchangeRatesAPI = async () => {
  const response = await fetch(API_URL);
  const result = await response.json();
  // delete result.USDT;
  return result;
};

export default exchangeRatesAPI;
