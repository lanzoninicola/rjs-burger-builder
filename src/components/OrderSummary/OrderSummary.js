import React from 'react';
import Button from './Button/Button';
import BurgerPrice from '../Burger/BuildControls/BurgerPrice/BurgerPrice';

import { Link } from 'react-router-dom';


const OrderSummary = (props) => {

    const ingredientsList = Object.keys(props.ingredientsList)
        .map(ingredient => {
            return <li key={ingredient}>{ingredient + ':' + props.ingredientsList[ingredient]}</li>
    })
    
    //console.log(props);

    return (

        
        <div>
            <p><strong>Thank you to choice us!</strong></p>
            <p>Here, the summary of your order:</p>
            <ul>
                {ingredientsList}          
            </ul>
            <BurgerPrice totalOrderPrice={props.totalOrderPrice}/>
            <Link to='/' >
                <Button btnType='Success' clicked={props.stopTheOrderHandler}>CLOSE</Button>
            </Link>
         
                <Button btnType='Danger' clicked={props.checkOutOrderHandler}>CHECK OUT</Button>
        </div>
        
    );
};

export default OrderSummary;