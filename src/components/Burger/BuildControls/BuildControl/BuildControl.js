import React from 'react';
import classes from './BuildControl.css'

const buildControl = (props) => {

    const {label, type, removeIngredientsHandler, addIngredientsHandler } = props;

    return (
        <div className={classes.BuildControl}>
             <div className={classes.Label}>{label}</div>
             <button 
                className={classes.Less}
                onClick={() => removeIngredientsHandler(type)}
                >Less</button>
             <button 
                className={classes.More}
                onClick={() => addIngredientsHandler(type)}
                >More</button>
        </div>
    );
};

export default buildControl;    