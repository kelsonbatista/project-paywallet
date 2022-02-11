import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addUserEmail } from '../actions/userActions';
import '../assets/styles/Login.css';
import walletLogo from '../assets/images/mywallet.jpeg';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
    this.validateButton();
  }

  validateButton = () => {
    const { email, password } = this.state;
    const validateEmail = this.validateEmail(email);
    const validadePassword = this.validatePassword(password);
    if (validateEmail === false && validadePassword === false) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  handleSubmit = () => {
    const { email } = this.state;
    const { history, emailDispatch } = this.props;
    emailDispatch(email);
    history.push('/carteira');
  }

  validatePassword = (password) => {
    const MAX_PWD_LENGTH = 6;
    return (password.length + 1) < MAX_PWD_LENGTH;
  }

  validateEmail = (email) => {
    const pattern = /\S+@\S+\.\S+/;
    return (!pattern.test(email));
  }

  render() {
    const { email, password, isDisabled } = this.state;

    return (
      <main>
        <section className="login">
          <div className="login__img">
            <img src={ walletLogo } alt="My Wallet" />
          </div>
          <div className="login__input">
            <label htmlFor="email">
              <input
                data-testid="email-input"
                id="email"
                name="email"
                onChange={ this.handleChange }
                placeholder="Type your email"
                type="text"
                value={ email }
              />
            </label>
            <label htmlFor="password">
              <input
                data-testid="password-input"
                id="password"
                name="password"
                onChange={ this.handleChange }
                placeholder="Type your password"
                type="password"
                value={ password }
              />
            </label>
            <button
              type="button"
              className={ `login__button ${isDisabled && 'login__button-disabled'}` }
              onClick={ this.handleSubmit }
              disabled={ isDisabled }
            >
              Entrar
            </button>
          </div>
        </section>
      </main>
    );
  }
}

Login.propTypes = {
  history: PropTypes.instanceOf(Object),
  getEmailDispatch: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  emailDispatch: (email) => dispatch(addUserEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
