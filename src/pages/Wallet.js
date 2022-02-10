import propTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Carteira extends Component {
  render() {
    const { email } = this.props;

    return (
      <>
        <header>
          <section className="header">
            <h1>Carteira</h1>
            <span>{ email }</span>
          </section>
        </header>
        <main>
          <h2>Body</h2>
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
