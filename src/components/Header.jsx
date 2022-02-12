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
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: tagValue,
    };
  }

  componentDidMount() {
    const { getAllCurrencies } = this.props;
    getAllCurrencies(); // executa para enviar ao estado global
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  handleSubmit = async () => {
    const { expensesDispatch } = this.props;
    const {
      id,
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    this.setState((prevState) => ({
      id: prevState.id + 1,
    }));

    const expenses = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: await exchangeRatesAPI(),
      // precisou chamar novamente a requisicao direto da API para guardar o objeto
    };

    expensesDispatch(expenses);
    console.log(expenses, 'header - submit');

    this.setState({
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: tagValue,
    });
  }

  updateTotal = () => {
    const { expenses } = this.props;
    // console.log(expenses);
    return expenses.reduce((prev, exp) => prev + (Number(exp.value)
    * exp.exchangeRates[exp.currency].ask), 0);
  }

  render() {
    const { email, currencies } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    // console.log(Object.values(currencies));

    const totalExpenses = this.updateTotal();

    return (
      <header>
        <section className="header">
          <img src={ MyWalletLogo } alt="My Wallet Logo" className="header__logo" />
          <div className="header__right">
            <span data-testid="email-field">{ `Email: ${email}` }</span>
            <span data-testid="total-field">
              Despesa Total:&nbsp;
              { totalExpenses.toFixed(2) }
            </span>
            <span data-testid="header-currency-field">BRL</span>
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
              className="value-input"
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
              className="description-input"
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
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getAllCurrencies: () => dispatch(getCurrencies()),
  expensesDispatch: (expenses) => dispatch(addExpenses(expenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
