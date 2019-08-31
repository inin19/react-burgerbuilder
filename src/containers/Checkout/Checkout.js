import React, { Component } from 'react';
import classes from './Checkout.module.css';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './../../containers/Checkout/ContactData/ContactData';


export class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0,

  }

  componentWillMount() {

    const query = new URLSearchParams(this.props.location.search);

    const ingredients = {};
    let price = 0;


    // eslint-disable-next-line no-unused-vars
    for (let param of query.entries()) {
      if (param[0] === 'price') {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }

    }



    this.setState({ ingredients: ingredients, price: price });

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
        <CheckoutSummary checkoutCancelled={this.checkoutCancelledHandler} checkoutContinue={this.checkoutContinueHandler} ingredients={this.state.ingredients} />
        <Route path={this.props.match.path + '/contact-data'} render={(props) => (<ContactData price={this.state.price} ingredients={this.state.ingredients} {...props} />)} />
      </div>
    )
  }
};

export default Checkout;