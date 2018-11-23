import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import instance from '../../axios-order';
import Spinner from '../../components/UI/Spinner/SpinnerLoading';
import ContactForm from '../../components/Order/ContactForm/ContactForm';


class Checkout extends Component {
    state = {
        ingredients: {},
        totalOrderPrice: 8878778,
        customer: {},
        loading: false

    }

    componentDidMount() {

        /*
        const query = new URLSearchParams(this.props.location.search);
        let ingredients = {};
        for(let param of query.entries()) {
            ingredients[param[0]] = +param[1];
        }
        
        this.setState({ingredients: ingredients})
        */
        //this.setInitalState(this.props.location.state.ingredients, this.props.location.state.totalOrderPrice);

        this.setCustomState({
            ingredients: this.props.location.state.ingredients,
            totalOrderPrice: this.props.location.state.totalOrderPrice
        })

    }

    /*
    setInitalState = (ingredients, totalOrderPrice) => {
        this.setState({
            ingredients: ingredients,
            totalOrderPrice: totalOrderPrice
        });
    }
    */

    setCustomState = (stateToUpdate) => {

        let obj = {};

        for (let stateElement in stateToUpdate) {
            obj[stateElement] = stateToUpdate[stateElement];
        }

        this.setState(obj);
    }


    closeCheckOutProcessHandler = () => {
        this.props.history.replace('/');
    }

    
    saveFormDataHandler = (formData) => (event) => {
        event.preventDefault();

        let customerData = formData();
        //this.setCustomState({customer: customerData});
        this.setState({customer: customerData}, 
            () => this.closeOrderHandler()
        )

    }

    closeOrderHandler = () => {
        //this.props.history.replace('/checkout/contact-data');

        const order = {
            ingredients: this.state.ingredients,
            totalOrderPrice: this.state.totalOrderPrice,
            customer: {
                name: this.state.customer.name,
                email: this.state.customer.email,
                address: this.state.customer.address,
                city: this.state.customer.city,
            },
            shipping: this.state.customer.shipping
        }

        this.setState({ loading: true });

        //console.log(order)

        instance.post('/order.json', order)
            .then(response => {
                console.log(response);
                this.setState({loading: false});
                this.props.history.replace('/');
                
            })
            .catch(error => {
                this.setState({loading: false});
            })
    }

    render() {

        //console.log(this.state.customer);

        const summary = !this.state.loading ?
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    //closeOrderHandler={this.closeOrderHandler}
                    closeCheckOutProcessHandler={this.closeCheckOutProcessHandler}
                />
                <ContactForm
                    ingredients={this.state.ingredients}
                    // non capisco perchè non usando la sintassi sotto i dati alla funzione
                    // sono comunque passati;
                    closeOrder={(e, data) => this.saveFormDataHandler(e, data)}
                    //saveFormData={this.saveFormDataHandler}
                />
            </div>
            : <Spinner />

        return (

            <div>
                {summary}
            </div>
        );
    }
}

export default Checkout;