import React, { Component} from 'react';
import Auxx from '../../hoc/Auxx/auxx';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import instance from '../../axios-order';
import Spinner from '../../components/UI/Spinner/SpinnerLoading';
// import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler.class';
// import { withRouter } from 'react-router-dom'


/*
const ingredientsPriceList = {
    bread: 99,
    salad: 0.5,
    cheese: 1,
    meat: 2,
    bacon: 0.5
}
*/

//This component will contain the component for:
// burger builder (interactive image to build a burger)
// burger controls (add the ingredients)
class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            cheese: 0,
            meat: 0,
            bacon: 0
        },
        ingredientsPriceFromPriceList: {},
        totalOrderPrice: 0,
        orderClosing: false,
        loading: false
    }
    

    componentDidMount() {
        this.loadPricesFromAPI();
    }
 

    stopTheOrderHandler = (event) => {
        this.setState({orderClosing: false});
    }

    checkOutOrderHandler = () => {
        this.props.history.push('/checkout', {ingredients: {...this.state.ingredients}, totalOrderPrice: this.state.totalOrderPrice})

        //this.props.history.push('/checkout?salad=1&meat=1&cheese=2'); -> first version
        /*
        let queryParams = [];

        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }

        queryParams = [...queryParams, encodeURIComponent('totalPrice') + '=' + encodeURIComponent(this.state.totalOrderPrice)];

        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
        */

        // alternative way
        // this.props.history.push({pathname: '/checkout', state={this.state.ingreidents});
        
        // alternative way
        //this.props.history.push('/checkout',{...this.state.ingredients})
    }
    
    closingOrderHandler = () => {
        const ingredientsState = {...this.state.ingredients};
        const ingredientsTotQty= Object.values(ingredientsState).reduce((acc, ingr) => acc + ingr);
        this.setState({orderClosing:  ingredientsTotQty>0}) 
    }

    loadPricesFromAPI = () => {
        instance.get('https://it-reactjs-burger-builder.firebaseio.com/ingredientsPriceList.json')
            .then(response => {
                
                let ingredientsPriceFromPriceList = {};

                ingredientsPriceFromPriceList = {...response.data};

                this.setState(
                    {
                    ingredientsPriceFromPriceList: ingredientsPriceFromPriceList //, 
                    //loading: true
                    }, 
                    //questa è la funzione callback per il metodo this.setState -> " () => ...some code... "
                    //la mia funzione di callback richiama un metodo della classe (setburgerOrderBasePrice)
                    () => this.setburgerOrderBasePrice(this.state.ingredientsPriceFromPriceList.bread)
                );

            })
            .catch(error => console.log(error))
        
        //this.setState({loading: false}) 
        
    }

    setburgerOrderBasePrice = (breadPrice) => {
        if(breadPrice) {
            this.setState({totalOrderPrice: breadPrice});
        }
    }

    addIngredientsHandler = (type) => {
        this.addIngredientsQty(type);
        this.increaseBurgerPrice(type);
    }

    removeIngredientsHandler = (type) => {
        this.removeIngredientsQty(type);
        this.decreaseBurgerPrice(type);
    }

    increaseBurgerPrice = (type) => {
        let ingredientsPrice = {...this.state.ingredientsPriceFromPriceList};
        //let totalOrderPrice = this.state.burgerOrderBasePrice;
        this.setState(prevState => ({totalOrderPrice: prevState.totalOrderPrice + ingredientsPrice[type]}));
    }

    decreaseBurgerPrice = (type) => {
        let ingredientsPrice = {...this.state.ingredientsPriceFromPriceList};
        if(this.state.ingredients[type] >=1) {
            this.setState(prevState => ({totalOrderPrice: prevState.totalOrderPrice - ingredientsPrice[type]}));
        }
    }

    addIngredientsQty = (type) => {
        let ingredientsQty = {...this.state.ingredients};
        ingredientsQty[type]++;
        let ingredients = {...ingredientsQty};
        this.setState({ingredients});
    }

    removeIngredientsQty = (type) => {
        let ingredientsQty = {...this.state.ingredients};
        if(this.state.ingredients[type] >=1) {
            ingredientsQty[type]--;
            let ingredients = {...ingredientsQty};
            this.setState({ingredients});
        }
    }

    render() {

        
        const modalOrderClosingHandler = (
            <Modal stopTheOrderHandler={this.stopTheOrderHandler}> 
                    {this.state.loading ? <Spinner /> : 
                        <OrderSummary 
                            ingredientsList={this.state.ingredients}
                            stopTheOrderHandler={this.stopTheOrderHandler}
                            checkOutOrderHandler={this.checkOutOrderHandler}
                            totalOrderPrice={this.state.totalOrderPrice}
                        />
                    }
            </Modal>
        )

        return (
            <Auxx>
                {this.state.orderClosing ? modalOrderClosingHandler : null}    
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    addIngredientsHandler={this.addIngredientsHandler}
                    removeIngredientsHandler={this.removeIngredientsHandler}
                    totalOrderPrice={this.state.totalOrderPrice}
                    closingOrderHandler={this.closingOrderHandler}
                />
            </Auxx>
        );
    }
}

// Router props are not passed to the child component because the
// BurgerBuilder component is wrapped into the WithErrorHandler hoc function
//  export default WithErrorHandler(BurgerBuilder);

export default BurgerBuilder;


