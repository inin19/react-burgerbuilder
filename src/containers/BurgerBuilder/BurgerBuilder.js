/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from './../../axios-orders';
import Spinner from './../../components/UI/Spinner/Spinner';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as burgerBuilderActions from './../../store/actions/index';



class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    // loading: false,
    // error: false
  };



  componentDidMount() {

    this.props.onInitIngredients();

    // console.log(this.props);

    // axios.get('https://react-myburger-50f53.firebaseio.com/ingredients.json')
    //   .then(response => {
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch(error => { this.setState({ error: true }) })
  }

  purhcaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purhcaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }


  purhcaseContinueHandler = () => {



    this.props.history.push({ pathname: '/checkout' });


  }


  updatePurchaseState(updatedIngredients) {
    const ingredients = {
      ...updatedIngredients
    };

    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => sum + el, 0);

    return sum > 0;


  }



  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    // eslint-disable-next-line no-unused-vars
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;


    if (this.props.ings) {
      orderSummary = <OrderSummary price={this.props.price} purchaseCancelled={this.purhcaseCancelHandler} purchaseContinued={this.purhcaseContinueHandler} ingredients={this.props.ings} />

    }



    let burger = this.props.error ? <p>ingredients can't be loaded</p> : <Spinner />

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls ordered={this.purhcaseHandler} disabled={disabledInfo}
            ingredientAdded={this.props.onIngreidentAdded}
            ingredientRemoved={this.props.onIngreidentRemoved} price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ings)} />
        </Aux>
      );

    }




    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purhcaseCancelHandler} >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
    error: state.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngreidentAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
    onIngreidentRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredient())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));

