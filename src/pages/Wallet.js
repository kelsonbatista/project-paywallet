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
            { expenses.map((expense, index) => (
              <tr key={ index }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{expense.value}</td>
                <td>{expense.currency}</td>
                <td>{expense.ask}</td>
                <td>{expense.totalItem}</td>
                <td>BRL</td>
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
