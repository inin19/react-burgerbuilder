/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import axios from './../../../axios-orders';

import Button from './../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from './../../../components/UI/Spinner/Spinner';
import Input from './../../../components/UI/Input/Input';
import { connect } from 'react-redux';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,

      },
      zipcode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'zip code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5

        },
        valid: false,
        touched: false,

      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,


      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,


      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ]
        },
        value: 'fastest',
        validation: {},
        valid: true
      },
    },
    formIsValid: false,
    loading: false
  }


  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.minLength && isValid;
    }

    return isValid;
  }

  orderHandler = (event) => {
    event.preventDefault();
    // console.log(this.props.ingredients);


    this.setState({ loading: true });
    const formData = {};


    // eslint-disable-next-line no-unused-vars
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }


    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData
    }

    axios.post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false, purchasing: false });
        this.props.history.push('/');

        // console.log(response);
      })
      .catch(error => {
        this.setState({ loading: false, purchasing: false });

        console.log(error);
      });


  }

  inputChangedHandler = (event, inputIdentifier) => {
    // console.log(event.target.value);
    const updatedOrderFrom = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderFrom[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedOrderFrom[inputIdentifier] = updatedFormElement;
    updatedFormElement.touched = true;


    let formIsValid = true;

    for (let inputIndentifier in updatedOrderFrom) {

      formIsValid = updatedOrderFrom[inputIndentifier].valid && formIsValid;
    }

    console.log(formIsValid);
    this.setState({ orderForm: updatedOrderFrom, formIsValid: formIsValid });
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({ id: key, config: this.state.orderForm[key] })
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {
          formElementsArray.map(formEl => (
            <Input
              key={formEl.id}
              elementType={formEl.config.elementType}
              elementConfig={formEl.config.elementConfig}
              value={formEl.config.value}
              invalid={!formEl.config.valid}
              shoudValidate={formEl.config.validation}
              touched={formEl.config.touched}
              changed={(event) => this.inputChangedHandler(event, formEl.id)} />
          ))
        }
        <Button btnType="Success" disabled={!this.state.formIsValid} > Order </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />
    }

    return (

      <div className={classes.ContactData}>
        <h4>Enter your contact Data</h4>
        {form}
      </div>
    );

  }
}
const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
}

export default connect(mapStateToProps)(ContactData);