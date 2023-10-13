import React, { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import './HeaderCartButton.css';

function HeaderCartButton(props) {
  const [btnIsHighlighted,setBtnIsHighlighted] = useState(false)
  // use context api here through useContext hook
  const cartCtx = useContext(CartContext);

  //here we calculate the length of the cart items - how many numbers of items in cart
  // but we cant simply use cartCtx.items.length -> because there can be more than 1 of one type food selected
  // so we use reduce method here 
  // reduce() -> it convert array of data to a single value
  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount; 
  }, 0); //initially the curNumber is zero -> after it change to the returned value

  const btnClasses = `button ${btnIsHighlighted ? ' bump' : ''}`;

  //destructure items here from cartCtx to use as dependency
  const {items} = cartCtx;

  useEffect(()=>{
    if(items.length === 0){
      return ;
    }
    setBtnIsHighlighted(true);

    //use set timeout function for to again remove bump class 
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => { // always clear settime out function -> for better practice
      clearTimeout(timer);
    };

  },[items])


  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className='icon'><CartIcon /></span>
      <span>Your cart</span>
      <span className='badge'>{numberOfCartItems}</span>
    </button>
  )
}

export default HeaderCartButton
