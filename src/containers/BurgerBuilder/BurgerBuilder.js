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

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };



  componentDidMount() {

    // console.log(this.props);

    axios.get('https://react-myburger-50f53.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(error => { this.setState({ error: true }) })
  }

  purhcaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purhcaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }


  purhcaseContinueHandler = () => {

    const queryParams = [];

    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }

    queryParams.push('price=' + this.state.totalPrice);
    const queryString = queryParams.join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });

    //alert('you continue');

    // this.setState({ loading: true });

    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: 'Max',
    //     address: {
    //       street: 'test 1',
    //       zipcode: '20910',
    //       country: 'USA'
    //     },
    //     email: 'test@test.com',
    //     deliveryMethod: 'fastest'
    //   }
    // }

    // axios.post('/orders.json', order)
    //   .then(response => {
    //     this.setState({ loading: false, purchasing: false });
    //     console.log(response);
    //   })
    //   .catch(error => {
    //     this.setState({ loading: false, purchasing: false });

    //     console.log(error);
    //   });

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

    this.setState({ purchasable: sum > 0 });


  }

  addIngredientHander = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }

    updatedIngredients[type] = updatedCount;
    const pricdAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + pricdAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);

  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];

    if (oldCount <= 0) {
      return;
    }

    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }

    updatedIngredients[type] = updatedCount;
    const pricdDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - pricdDeduction;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    // eslint-disable-next-line no-unused-vars
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;


    if (this.state.ingredients) {
      orderSummary = <OrderSummary price={this.state.totalPrice} purchaseCancelled={this.purhcaseCancelHandler} purchaseContinued={this.purhcaseContinueHandler} ingredients={this.state.ingredients} />

    }



    if (this.state.loading) {
      orderSummary = <Spinner />;
    }


    let burger = this.state.error ? <p>ingredients can't be loaded</p> : <Spinner />

    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls ordered={this.purhcaseHandler} disabled={disabledInfo}
            ingredientAdded={this.addIngredientHander}
            ingredientRemoved={this.removeIngredientHandler} price={this.state.totalPrice}
            purchasable={this.state.purchasable} />
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


export default withErrorHandler(BurgerBuilder, axios);

