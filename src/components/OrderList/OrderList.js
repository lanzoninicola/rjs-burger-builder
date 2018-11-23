import React, { Component } from 'react';
import instance from '../../axios-order';
import Spinner from '../UI/Spinner/SpinnerLoading';
import Order from './Order/Order'

class OrderList extends Component {
    state={
        orders: [],
        loading: true
    }    

    componentDidMount() {
        instance.get('/order.json')
            .then(response => {
                let data = response.data;
                this.initOrdersState(data);
            })
            .catch(error => console.log(error))
        
    }

    initOrdersState = (orders) => {
        this.setState({orders: orders, loading: false})
    }
    

    render() {

        let orders = {};
        orders = {...this.state.orders};

        // PERCHE' HO USATO OBJECT.VALUES???????? E NON OBJECT.KEYS ????
        // CAPIRE DIFFERENZA TRA FOR IN E FOR OF
        // FOREACH LO SI USA SOLO CON GLI ARRAY
        
        const orderList = Object.values(orders).map(
            (order, index) => 
                <Order key={index} 
                    customer={order.customer} 
                    ingredients={order.ingredients} 
                    totalOrderPrice={order.totalOrderPrice}/>
        );

        const orderComponent = !this.state.loading ? orderList : <Spinner />
        
        return (
            <div>
                {orderComponent}      
            </div>
        );
    }
}

export default OrderList;