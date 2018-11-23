import React from 'react';
import classes from './Modal.css'
import Backdrop from '../Backdrop/Backdrop';
import Auxx from '../../../hoc/Auxx/auxx';


const modal = (props) => {

    const modalAnimation={transform: 'translateY(0)'};

    return (
        <Auxx>
            <Backdrop stopTheOrderHandler={props.stopTheOrderHandler}/>
            <div style={modalAnimation} className={classes.Modal}>
                {props.children}
            </div>
        </Auxx>
    );
};

export default modal;