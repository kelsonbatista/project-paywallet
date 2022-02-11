// import propTypes from 'prop-types';
import React, { Component } from 'react';
// import { connect } from 'react-redux';
import '../assets/styles/Wallet.css';
import Header from '../components/Header';

class Carteira extends Component {
  // constructor() {
  //   super();

  // }

  render() {
    return (
      <>
        <Header />
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

// Carteira.propTypes = {
//   email: propTypes.string,
// }.isRequired;

export default Carteira;
