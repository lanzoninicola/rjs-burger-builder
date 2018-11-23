import React from 'react';
import classes from './SideDrawer.css'
import NavigationItems from '../NavigationItems/NavigationItems'

const SideDrawer = (props) => {
    return (
        <div className={classes.SideDrawer}>
            <NavigationItems />
        </div>
    );
};

export default SideDrawer;