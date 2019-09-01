import React, { Component } from 'react';
import classes from './Checkout.module.css';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './../../containers/Checkout/ContactData/ContactData';
import { connect } from 'react-redux';

export class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0,

  }



  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }


  render() {
    return (
      <div className={classes.Checkout}>
        <CheckoutSummary checkoutCancelled={this.checkoutCancelledHandler} checkoutContinue={this.checkoutContinueHandler} ingredients={this.props.ings} />
        <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
      </div>
    )
  }
};

const mapStateToProps = state => {
  return {
    ings: state.ingredients
  }
}

export default connect(mapStateToProps)(Checkout);