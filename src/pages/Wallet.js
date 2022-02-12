import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Table from 'react-bootstrap/Table';
import '../assets/styles/Wallet.css';
import Header from '../components/Header';
import { removeExpenses } from '../actions/walletActions';

class Carteira extends Component {
  render() {
    const { expenses, handleDelete } = this.props;

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
                <td>
                  <button
                    type="button"
                    className="btn-delete"
                    data-testid="delete-btn"
                    onClick={ () => handleDelete(exp.id) }
                  >
                    <FontAwesomeIcon icon={ faTrashCan } />
                  </button>
                </td>
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

const mapDispatchToProps = (dispatch) => ({
  handleDelete: (index) => dispatch(removeExpenses(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Carteira);
