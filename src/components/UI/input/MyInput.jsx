import React from 'react';
import classes from './MyInput.module.css';


const MyInput = (props) => {
    
    return(
    <input type="text" className={classes.myInp} {...props} /> )
}

export default MyInput ;