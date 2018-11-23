import React from 'react';
import classes from './BurgerPrice.css'

const burgerPrice = (props) => {
    return (
        <div className={classes.BurgerPrice}>
            <p>Total Price: <strong>{props.totalOrderPrice.toFixed(2)}</strong></p>
        </div>
    );
};

export default burgerPrice;