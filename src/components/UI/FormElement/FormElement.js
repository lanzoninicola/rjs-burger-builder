import React from 'react';
import classes from './FormElement.css'
import FormError from './FormError/FormError';

const FormElement = ({type, name, options, value, errorMessage, changeFormValuesHandler}) => {

    //console.log(options);

    let elementForm = '';

    console.log(errorMessage);

    switch (type) {
        case "input":
            elementForm = 
                <div>
                    {/*<label for={name}>{options.label}</label>*/}
                    <input 
                        className={classes.FormInputElement} 
                        type={type} 
                        name={name} 
                        autoComplete={name} 
                        placeholder={options.placeholder}
                        value={value}
                        onChange={changeFormValuesHandler}
                    />
                    {console.log(errorMessage.length)}
                    {(errorMessage.length > 0 && errorMessage[0].length !== 0) ? <FormError errorMessage={errorMessage} /> : null}
                </div>
            break;
        case "select":
            elementForm = 
                <select 
                    className={classes.FormInputElement} 
                    name={name} 
                    autoComplete={name}
                    onChange={changeFormValuesHandler}
                    > 
                    {options.listValues.map (
                        optValue => <option key={optValue} value={optValue}>
                            {value ? optValue : value}
                            </option>
                        )
                    }
                    
                </select>
        break;
        default:
            break;
    }


    return (
        <div className={classes.FormElement}>
            
                {elementForm}
            
        </div>
    );
};

export default FormElement;