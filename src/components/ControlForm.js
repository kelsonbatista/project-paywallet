import React, { Component } from 'react';
import propTypes from 'prop-types';

class ControlForm extends Component {
  render() {
    const {
      headerState: {
        value,
        description,
        currency,
        method,
        tag,
      },
      headerProps: {
        currencies,
      },
      onChange,
      onClick,
    } = this.props;

    return (
      <section className="control">
        {/* { `control ${edit.isEditing && 'control-edit'}` } */}
        <label htmlFor="value" id="value-label">
          Valor:
          <input
            type="number"
            id="value"
            name="value"
            data-testid="value-input"
            className="value-input"
            value={ value }
            onChange={ onChange }
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
            onChange={ onChange }
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
            onChange={ onChange }
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
            onChange={ onChange }
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
            onChange={ onChange }
          />
        </label>
        <button
          type="submit"
          id="button"
          className="control-btn"
          onClick={ onClick }
        >
          Adicionar despesa
        </button>
      </section>
    );
  }
}

ControlForm.propTypes = {
  value: propTypes.number,
  description: propTypes.string,
  currency: propTypes.number,
  method: propTypes.string,
  tag: propTypes.string,
  currencies: propTypes.object,
  onChange: propTypes.func,
  onClick: propTypes.func,
}.isRequired;

export default ControlForm;
