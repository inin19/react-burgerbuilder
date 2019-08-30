import React, { Component } from 'react';
import classes from './Checkout.module.css';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './../../containers/Checkout/ContactData/ContactData';

export class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meeat: 1,
      cheese: 1,
      bacon: 1
    }
  }

  componentDidMount() {

    const query = new URLSearchParams(this.props.location.search);

    const ingredients = {};


    // eslint-disable-next-line no-unused-vars
    for (let param of query.entries()) {
      ingredients[param[0]] = +param[1];
    }



    this.setState({ ingredients: ingredients });

  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutCancelledContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }


  render() {
    return (
      <div className={classes.Checkout}>
        <CheckoutSummary checkoutCancelled={this.checkoutCancelledHandler} checkoutContinue={this.checkoutCancelledContinueHandler} ingredients={this.state.ingredients} />
        <Route path={this.props.match + '/contact-data'} component={ContactData} />
      </div>
    )
  }
};

export default Checkout;