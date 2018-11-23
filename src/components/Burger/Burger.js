import React from 'react';
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {
/*
    1. the Object.keys(props.ingredients) returns an array containing the keys, i.e., the ingredient names. 
        ["salad", "cheese", "meat", "bacon"]
    2. Using the map function on this array, we construct a new array using the Array() function by passing the number of 
    times each ingredient must be added.
    The new array "[...Array(props.ingredients[igKey])]" is an array of undefined item, it is used only for determine how many time we need to loop trough "map((_, i)"
    to buid the JSX 
        props.ingredients[igKey] === props.ingredients["cheese"] => 3
        props.ingredients[igKey] => [igKey] is a placeholder

    3. This (above) number will determine how many <Ingredient ... />s (of each ingredient type) are drawn to the GUI.

    In short, we are extracting the keys of the ingredients into an array, 
    then for each ingredient in that array, we are creating a new array with that ingredient present as many times as specified 
    in the value, then for each element of that array (the second one), we are generating JSX.
  */
 
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            //console.log([...Array(props.ingredients[igKey])]);
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey +i} type={igKey} />
                });
        })
        .reduce((prev, curr) => {
            return prev.concat(curr);
        }, []); 
    
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>
    }
    //console.log(transformedIngredients);

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;