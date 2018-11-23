import React from 'react';
import Classes from './FormError.css'


const FormError = (props) => {
    return (
        <div className={Classes.FormErrorLabel}>
            <p>{props.errorMessage}</p>
        </div>
    );
};

export default FormError;