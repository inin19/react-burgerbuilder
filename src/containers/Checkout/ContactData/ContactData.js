import React, { Component } from 'react';


import Button from './../../../components/UI/Button/Button';
import classes from './ContactData.module.css';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      zipCode: ''
    }
  }

  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact Data</h4>
        <form>
          <input type="text" name="name" placeholder="Your name" />
          <input type="email" name="name" placeholder="Your email" />
          <input type="text" name="street" placeholder="street" />
          <input type="text" name="zipCode" placeholder="zip code" />
          <Button btnType="Succes"> Order</Button>
        </form>
      </div>
    )
  }
}

export default ContactData;