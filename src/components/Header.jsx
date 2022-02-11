import propTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../assets/styles/Wallet.css';
import MyWalletLogo from '../assets/images/mywallet2.jpeg';
import { getCurrencies, addExpenses } from '../actions/walletActions';
import exchangeRatesAPI from '../services/exchangeRatesAPI';

const tagValue = 'Alimentação';
class Header extends Component {
  constructor() {
    super();

    this.state = {
      totalExpenses: 0,
      refCurrency: 'BRL',
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      currencyName: 'Dólar Americano',
      method: 'Dinheiro',
      tag: tagValue,
      ask: 0,
      totalItem: 0,
    };
  }

  componentDidMount() {
    const { getAllCurrencies } = this.props;
    getAllCurrencies(); // executa para enviar ao estado global
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
    const total = document.querySelector('#currency');
    const value = document.querySelector('#value');
    const ask = total.options[total.selectedIndex]
      .getAttribute('data-ask');
    const currencyName = total.options[total.selectedIndex]
      .getAttribute('data-currencyname').split('/')[0];
    // console.log(currencyName);
    this.setState({
      ask, // (Math.round(ask * 100) / 100)
      totalItem: (Number(value.value) * ask).toFixed(2),
      currencyName,
    });
  }

  handleSubmit = async () => {
    const { expensesDispatch } = this.props;
    const {
      id,
      value,
      description,
      currency,
      currencyName,
      method,
      tag,
      ask,
      totalItem,
    } = this.state;

    this.setState((prevState) => ({
      id: prevState.id + 1,
      totalExpenses: prevState.totalExpenses + (value * ask),
    }));

    const expenses = {
      id,
      value,
      description,
      currency,
      currencyName,
      method,
      tag,
      ask,
      totalItem,
      exchangeRates: await exchangeRatesAPI(),
      // precisou chamar novamente a requisicao direto da API para guardar o objeto
    };

    expensesDispatch(expenses);

    this.setState({
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: tagValue,
    });
  }

  render() {
    const { email, currencies } = this.props;
    const {
      totalExpenses,
      refCurrency,
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    // console.log(Object.values(currencies));

    return (
      <header>
        <section className="header">
          <img src={ MyWalletLogo } alt="My Wallet Logo" className="header__logo" />
          <div className="header__right">
            <span data-testid="email-field">{ `Email: ${email}` }</span>
            <span data-testid="total-field">
              { `Despesa Total: ${totalExpenses.toFixed(2)}` }
            </span>
            <span data-testid="header-currency-field">{ refCurrency }</span>
          </div>
        </section>
        <section className="control">
          <label htmlFor="value" id="value-label">
            Valor:
            <input
              type="number"
              id="value"
              name="value"
              data-testid="value-input"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency" id="currency-label">
            Moeda:
            <select
              type="text"
              id="currency"
              name="currency"
              data-testid="currency-input"
              value={ currency }
              onChange={ this.handleChange }
            >
              { Object.values(currencies)
                .filter((rate) => rate.codein !== 'BRLT')
                .map((rate, index) => (
                  <option
                    key={ index }
                    data-testid={ rate.code }
                    data-ask={ rate.ask }
                    data-currencyname={ rate.name }
                  >
                    { rate.code }
                  </option>
                ))}
            </select>
          </label>
          <label htmlFor="payment" id="payment-label">
            Método de pagamento:
            <select
              type="text"
              id="payment"
              name="method"
              data-testid="method-input"
              value={ method }
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag" id="tag-label">
            Tag:
            <select
              type="text"
              id="tag"
              name="tag"
              data-testid="tag-input"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <label htmlFor="description" id="description-label">
            Descrição:
            <input
              type="text"
              id="description"
              name="description"
              data-testid="description-input"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="submit"
            id="button"
            onClick={ this.handleSubmit }
          >
            Adicionar despesa
          </button>
        </section>
      </header>
    );
  }
}

Header.propTypes = {
  email: propTypes.string,
  currencies: propTypes.object,
  getAllCurrencies: propTypes.func,
  expensesDispatch: propTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getAllCurrencies: () => dispatch(getCurrencies()),
  expensesDispatch: (expenses) => dispatch(addExpenses(expenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
