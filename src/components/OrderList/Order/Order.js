import React from 'react';
import classes from './Order.css'

const Order = (props) => {
    
    
    return (
        <div className={classes.Order}>
    
            <p>Name: {props.customer.name}</p>
            <p>Address: {props.customer.address}</p>
            <p>City: {props.customer.city}</p>
            <p>Ingredients: bacon: {props.ingredients.bacon}</p>
            <p>Price: {props.totalOrderPrice}</p>
        </div>
        
    );
};

export default Order;