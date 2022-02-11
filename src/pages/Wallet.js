import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';
import '../assets/styles/Wallet.css';
import Header from '../components/Header';

class Carteira extends Component {
  render() {
    const { expenses } = this.props;

    return (
      <>
        <Header />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses.map((exp, index) => (
              <tr key={ index }>
                <td>{exp.description}</td>
                <td>{exp.tag}</td>
                <td>{exp.method}</td>
                <td>{Number(exp.value).toFixed(2)}</td>
                <td>{exp.exchangeRates[exp.currency].name}</td>
                <td>{Number(exp.exchangeRates[exp.currency].ask).toFixed(2)}</td>
                <td>{ (exp.value * (exp.exchangeRates[exp.currency].ask)).toFixed(2)}</td>
                <td>Real</td>
                <td>Editar/Excluir</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
  }
}

Carteira.propTypes = {
  email: propTypes.string,
  expenses: propTypes.object,
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Carteira);
