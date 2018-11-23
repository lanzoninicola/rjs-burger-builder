import React, {Component} from 'react';
import classes from './Layout.css'
import Auxx from '../../hoc/Auxx/auxx'
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Backdrop from '../UI/Backdrop/Backdrop';

//I'm using layout only for wrapping pages
class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  stopTheOrderHandler = () => {
    this.setState({showSideDrawer: false})
  }

  showSideDrawer = (event) => {
    this.setState({showSideDrawer: true})
  }

  render() {
    const sideDrawer = (
     <div>
        <Backdrop stopTheOrderHandler={this.stopTheOrderHandler}/>
        <SideDrawer/>
      </div>
    )

    return (
      <Auxx>
      {this.state.showSideDrawer ? sideDrawer : null}
      <Toolbar showSideDrawer={this.showSideDrawer} mobileMode/>
      <main className={classes.Content}>
        {this.props.children}
      </main>
    </Auxx>
    );
  }
}

export default Layout;
