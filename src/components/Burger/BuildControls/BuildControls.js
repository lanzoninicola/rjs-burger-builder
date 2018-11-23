import React from 'react';
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'
import BurgerPrice from './BurgerPrice/BurgerPrice';
import Auxx from '../../../hoc/Auxx/auxx';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
]

const BuildControls = props => {
    
   
    return (
        
        <Auxx>
        <div className={classes.BuildControls}>
            <BurgerPrice totalOrderPrice={props.totalOrderPrice}/>
            {controls.map(ctrl => 
                (
                    <BuildControl key={ctrl.label}     
                        label={ctrl.label} 
                        type={ctrl.type} 
                        addIngredientsHandler={props.addIngredientsHandler}
                        removeIngredientsHandler={props.removeIngredientsHandler}
                        />
                )
            )}
            <button 
                className={classes.OrderButton}
                onClick={props.closingOrderHandler}
            >ORDER NOW</button>
        </div>
        </Auxx>
        
    );
};


export default BuildControls;