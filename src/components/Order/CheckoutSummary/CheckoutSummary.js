import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../OrderSummary/Button/Button';

import { withRouter } from 'react-router-dom';


const CheckoutSummary = (props) => {
       
    const style={width: '100%', margin: 'auto', textAlign: 'center'};

    return (
        <div style={style}>
            <h3>We hope you enjoyed the experience!!</h3>

            <Burger ingredients={props.ingredients}/>
            <Button btnType='Success' clicked={props.closeCheckOutProcessHandler}>CLOSE</Button>
            {/*<Button btnType='Danger' clicked={props.closeOrderHandler}>CONTINUE</Button>*/}
        </div> 
    );
};

export default withRouter(CheckoutSummary);