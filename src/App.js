import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import './App.css';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import OrderList from './components/OrderList/OrderList';
import Checkout from './containers/Checkout/Checkout';
//import CallbackTest from './containers/CallbackTest/CallbackTest';
//import IndividualGrid from './containers/IndividualGrid/IndividualGrid';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout}/>
            <Route path="/orders" component={OrderList}/>
            {/*<Route path="/" exact render={props => (<BurgerBuilder  {...this.props}/>)}/>*/}
            <Route path="/" component={BurgerBuilder}/>
          </Switch>
        </Layout>
        
      </div>
    );
  }
}

export default App;
