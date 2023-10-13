import React from 'react';
import './Input.css';

const Input = React.forwardRef((props,ref) => { //here we use 
    return (
        //id={props.input.id} --> we can use one by one also or can give {...props.input} in input
        <div className='input'>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input ref={ref} {...props.input}/> 
        </div>
    )
});

export default Input
