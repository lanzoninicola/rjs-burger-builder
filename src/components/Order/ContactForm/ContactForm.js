import React, { Component } from 'react';
import classes from './ContactForm.css'
import FormElement from '../../UI/FormElement/FormElement'
import Button from '../../OrderSummary/Button/Button';

class ContactForm extends Component {
    state = {
        formElements: {
            name: {
                elementType: 'input',
                elementName: 'name',
                elementOptions: {
                    label: 'Name',
                    placeholder: 'Insert your Name'
                },
                elementValue: '',
                validation: {
                    rules: {
                        mandatory: true,
                        minLenght: 5,
                        maxLenght: 100
                    },
                    errorMessaggeConfig: {
                        mandatory: "This field is mandatory",
                        minLenght: "The value is too short",
                        maxLenght: "The lenght of value is not permitted"
                    },
                    errorMessageValue: []
                }
            },
            email: {
                elementType: 'input',
                elementName: 'email',
                elementOptions: {
                    label: 'E-mail',
                    placeholder: 'Insert your E-mail'
                },
                elementValue: '',
                validation: {
                    rules: {
                        mandatory: true,
                        minLenght: 5,
                        // /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        pattern: ""
                    },
                    errorMessaggeConfig: {
                        mandatory: "This field is mandatory",
                        minLenght: "The value is too short",
                        maxLenght: "The lenght of value is not permitted"
                    },
                    errorMessageValue: []
                }
            },
            address: {
                elementType: 'input',
                elementName: 'address',
                elementOptions: {
                    label: 'Address',
                    placeholder: 'Insert your Address'
                },
                elementValue: '',
                validation: {
                    rules: {
                        mandatory: true,
                        minLenght: 5,
                        maxLenght: 100
                    },
                    errorMessaggeConfig: {
                        mandatory: "This field is mandatory",
                        minLenght: "The value is too short",
                        maxLenght: "The lenght of value is not permitted"
                    },
                    errorMessageValue: []
                }
            },
            city: {
                elementType: 'input',
                elementName: 'city',
                elementOptions: {
                    label: 'City',
                    placeholder: 'Insert your City'
                },
                elementValue: '',
                validation: {
                    rules: {
                        mandatory: true,
                        minLenght: 5,
                        maxLenght: 100
                    },
                    errorMessaggeConfig: {
                        mandatory: "This field is mandatory",
                        minLenght: "The value is too short",
                        maxLenght: "The lenght of value is not permitted"
                    },
                    errorMessageValue: []
                }
            },
            shipping: {
                elementType: 'select',
                elementName: 'shipping',
                elementOptions: {
                    label: 'Shipping',
                    listValues: ['Fastest', 'Normal']
                },
                elementValue: 'Fastest',
                validation: {
                    rules: {
                        mandatory: true,
                        minLenght: 5,
                        maxLenght: 100
                    },
                    errorMessaggeConfig: {
                        mandatory: "This field is mandatory",
                        minLenght: "The value is too short",
                        maxLenght: "The lenght of value is not permitted"
                    },
                    errorMessageValue: []
                }

            }

        }
    }


    shouldComponentUpdate(nextProps, nextState) {
        //console.log(nextState.formElements);
        if (this.state.formElements !== nextState.formElements) {
            return true;
        }
        return false;
    }

    checkValidation = (elementForm) => {

        let elementFormObj = { ...this.state.formElements[elementForm] }

        let validationResult = {
            error: false,
            errorMessage: []
        };

        let mandatoryErrorCount = 0;
        let minLenghtErrorCount = false;
        let maxLenghtErrorCount = 0;

        for (let validationRule in elementFormObj.validation.rules) {

            let formValueLenght = String(elementFormObj.elementValue).length;
            console.log(formValueLenght);

            if (validationRule === "mandatory" &&
                elementFormObj.validation.rules[validationRule] === true &&
                formValueLenght === 0)
                mandatoryErrorCount++;

            if (validationRule === "minLenght" &&
                (formValueLenght < elementFormObj.validation.rules[validationRule] &&
                    formValueLenght > 0))
                minLenghtErrorCount = true;
                else minLenghtErrorCount = false;

            if (validationRule === "maxLenght" &&
                formValueLenght > elementFormObj.validation.rules[validationRule])
                maxLenghtErrorCount++;
        }


        if (mandatoryErrorCount > 0)
            validationResult.errorMessage.push(elementFormObj.validation.errorMessaggeConfig.mandatory)

        if (minLenghtErrorCount === true)
            validationResult.errorMessage.push(elementFormObj.validation.errorMessaggeConfig.minLenght)
            

        if (maxLenghtErrorCount > 0)
            validationResult.errorMessage.push(elementFormObj.validation.errorMessaggeConfig.maxLenght)

        //elementFormObj.validation.errorMessageValue = errorMessage;

        //this.setState({ elementFormObj });

        if (mandatoryErrorCount > 0 ||
            minLenghtErrorCount > 0 ||
            maxLenghtErrorCount > 0
        )
            validationResult.error = true;

        return validationResult;


    }

    changeFormValuesHandler = (event, elementForm) => {
        const formElement = { ...this.state.formElements };
        formElement[elementForm].elementValue = event.target.value;

        let validationCheck = this.checkValidation(elementForm);

        if (validationCheck.error) {
            formElement[elementForm].validation.errorMessageValue = validationCheck.errorMessage;
        }

        //console.log(formElement[elementForm].elementValue);
        //console.log("changeFormValuesHandler");
        this.setState({ formElements: formElement });

    }

    getFormValues = () => {
        const formElements = { ...this.state.formElements };
        let formValues = {};

        for (let formElement in formElements) {
            formValues[formElement] = formElements[formElement].elementValue;;
        }

        return formValues;
    }


    render() {

        const formElements = { ...this.state.formElements };

        console.log(formElements.name.validation.errorMessageValue);

        let formElementComponent = Object.keys(formElements)
            .map(
                (element) => 
                        <FormElement
                            key={element}
                            type={formElements[element].elementType}
                            name={formElements[element].elementName}
                            value={formElements[element].elementValue}
                            options={formElements[element].elementOptions}
                            errorMessage={[formElements[element].validation.errorMessageValue]}
                            changeFormValuesHandler={(event) => this.changeFormValuesHandler(event, formElements[element].elementName)}
                        />
            )

        //console.log(this.props.saveFormData);
        /*
        Object.entries(formElements).forEach(
            //([key, element]) => console.log(element)
            ([key, element]) => {
                console.log(element);
            }
        )
        */

        //console.log(this.props.saveFormData);

        return (
            <div className={classes.ContactForm}>
                <form
                    onSubmit={this.props.closeOrder(this.getFormValues)}
                >
                    <h4>Enter your Contact Data</h4>
                    {formElementComponent}
                    <Button btnType="Success">ORDER</Button>
                </form>

            </div>
        );
    }
}

export default ContactForm;
