import propTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../assets/styles/Wallet.css';
import MyWalletLogo from '../assets/images/mywallet2.jpeg';
import { getCurrencies, addExpenses } from '../actions/walletActions';

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
      method: '',
      tag: '',
    };
  }

  componentDidMount() {
    const { getAllCurrencies } = this.props;
    getAllCurrencies();
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  handleSubmit = () => {
    const { currencies, expensesDispatch } = this.props;
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
      totalExpenses: prevState.totalExpenses + parseInt(value, 10),
    }));

    const expenses = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: currencies,
    };

    expensesDispatch(expenses);

    this.setState({
      value: 0,
      description: '',
      currency: 'USD',
      method: '',
      tag: '',
    });
  }

  render() {
    const { email, currencies } = this.props;
    const {
      totalExpenses,
      refCurrency,
      value,
      currency,
      method,
      tag,
      description,
    } = this.state;
    // console.log(Object.keys(currencies));

    return (
      <header>
        <section className="header">
          <img src={ MyWalletLogo } alt="My Wallet Logo" className="header__logo" />
          <div className="header__right">
            <span data-testid="email-field">{ `Email: ${email}` }</span>
            <span data-testid="total-field">{ `Despesa Total: ${totalExpenses}` }</span>
            <span data-testid="header-currency-field">{ refCurrency }</span>
          </div>
        </section>
        <section className="control">
          <label htmlFor="control-value">
            Valor:
            <input
              type="number"
              id="control-value"
              name="value"
              data-testid="value-input"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="control-currency">
            Moeda:
            <select
              type="text"
              id="control-currency"
              name="currency"
              data-testid="currency-input"
              value={ currency }
              onChange={ this.handleChange }
            >
              { Object.keys(currencies)
                .map((rate, index) => (
                  <option
                    key={ index }
                  >
                    { rate }
                  </option>
                ))}
            </select>
          </label>
          <label htmlFor="control-payment">
            Método de pagamento:
            <select
              type="text"
              id="control-payment"
              name="method"
              data-testid="method-input"
              value={ method }
              onChange={ this.handleChange }
            >
              <option value="Dinheiro" selected>Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="control-tag">
            Tag:
            <select
              type="text"
              id="control-tag"
              name="tag"
              data-testid="tag-input"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option value="Alimentação" selected>Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <label htmlFor="control-description">
            Descrição:
            <input
              type="text"
              id="control-description"
              name="description"
              data-testid="description-input"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="submit"
            id="control-button"
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
