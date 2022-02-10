import propTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../assets/styles/Wallet.css';
import MyWalletLogo from '../assets/images/mywallet2.jpeg';

class Carteira extends Component {
  constructor() {
    super();

    this.state = {
      totalExpenses: 0,
      currentCurrency: 'BRL',
    };
  }

  render() {
    const { email } = this.props;
    const { totalExpenses, currentCurrency } = this.state;

    return (
      <>
        <header>
          <section className="header">
            <img src={ MyWalletLogo } alt="My Wallet Logo" className="header__logo" />
            <div className="header__right">
              <span data-testid="email-field">{ `Email: ${email}` }</span>
              <span data-testid="total-field">{ `Despesa Total: ${totalExpenses}` }</span>
              <span data-testid="header-currency-field">{ currentCurrency }</span>
            </div>
          </section>
          <section className="control">
            <label htmlFor="control-value">
              Valor:
              <input type="text" id="control-value" />
            </label>
            <label htmlFor="control-currency">
              Moeda:
              <input type="text" id="control-currency" />
            </label>
            <label htmlFor="control-payment">
              Método de pagamento:
              <input type="text" id="control-payment" />
            </label>
            <label htmlFor="control-tag">
              Tag:
              <input type="text" id="control-tag" />
            </label>
            <label htmlFor="control-description">
              Descrição:
              <input type="text" id="control-description" />
            </label>
            <button type="submit" id="control-button">Adicionar despesa</button>
          </section>
        </header>
        <main>
          <section className="table">
            <span className="table__title">Descrição</span>
            <span className="table__title">Tag</span>
            <span className="table__title">Método de Pagamento</span>
            <span className="table__title">Valor</span>
            <span className="table__title">Moeda</span>
            <span className="table__title">Câmbio utilizado</span>
            <span className="table__title">Valor convertido</span>
            <span className="table__title">Moeda de conversão</span>
            <span className="table__title">Editar/Excluir</span>
          </section>
        </main>
      </>
    );
  }
}

Carteira.propTypes = {
  email: propTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps, null)(Carteira);
