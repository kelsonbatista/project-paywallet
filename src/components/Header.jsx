import propTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../assets/styles/Wallet.css';
import MyWalletLogo from '../assets/images/mywallet2.jpeg';
import { getCurrencies, addExpenses } from '../actions/walletActions';
import exchangeRatesAPI from '../services/exchangeRatesAPI';
import ControlForm from './ControlForm';

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
    // this.editField();
  }

  // editField = () => {
  //   const { edit, expenses } = this.props;

  //   if (edit.isEditing) {
  //     const item = expenses[edit.itemIndex];
  //     console.log(item);
  //     this.setState({
  //       id: item.id,
  //       value: item.value,
  //       description: item.description,
  //       currency: item.currency,
  //       method: item.method,
  //       tag: item.tag,
  //     });
  //   } else {
  //     console.log('nao esta em edicao');
  //   }
  // }

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
    const {
      email,
      // currencies,
      // edit,
    } = this.props;

    // const {
    //   value,
    //   description,
    //   currency,
    //   method,
    //   tag,
    // } = this.state;
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
        <ControlForm
          headerState={ this.state }
          headerProps={ this.props }
          onChange={ this.handleChange }
          onClick={ this.handleSubmit }
        />
      </header>
    );
  }
}

Header.propTypes = {
  email: propTypes.string,
  currencies: propTypes.object,
  expenses: propTypes.object,
  edit: propTypes.object,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  edit: state.wallet.edit,
});

const mapDispatchToProps = (dispatch) => ({
  getAllCurrencies: () => dispatch(getCurrencies()),
  expensesDispatch: (expenses) => dispatch(addExpenses(expenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
