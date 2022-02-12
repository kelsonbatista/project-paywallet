import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Table from 'react-bootstrap/Table';
import '../assets/styles/Wallet.css';
import Header from '../components/Header';
import { removeExpenses, editExpense } from '../actions/walletActions';

class Carteira extends Component {
  constructor() {
    super();

    this.state = {
      isEditing: false,
      itemIndex: undefined,
    };
  }

  handleEdit = (index) => {
    // console.log(index);
    const { dispatchEdit } = this.props;
    this.setState({
      isEditing: true,
      itemIndex: index,
    }, () => dispatchEdit(this.state));
  }

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
            { expenses.map((expense, index) => {
              const {
                id,
                description,
                tag,
                method,
                value,
                currency,
                exchangeRates,
              } = expense;

              const currencyData = exchangeRates[currency];
              const { name, ask } = currencyData;

              return (
                <tr key={ index }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{Number(value).toFixed(2)}</td>
                  <td>{name.split('/')[0]}</td>
                  <td>{Number(ask).toFixed(2)}</td>
                  <td>{(value * ask).toFixed(2)}</td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      className="btn-edit"
                      data-testid="edit-btn"
                      onClick={ () => this.handleEdit(id) }
                    >
                      <FontAwesomeIcon icon={ faPenToSquare } />
                    </button>
                    <button
                      type="button"
                      className="btn-delete"
                      data-testid="delete-btn"
                      onClick={ () => handleDelete(id) }
                    >
                      <FontAwesomeIcon icon={ faTrashCan } />
                    </button>
                  </td>
                </tr>
              );
            })}
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
  dispatchEdit: (state) => dispatch(editExpense(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Carteira);
