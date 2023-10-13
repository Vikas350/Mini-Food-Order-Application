import React, { useReducer } from 'react';
import CartContext from './cart-context';

//default cart -> it should be return by art reducer if the no item is in cart
const defaultCartState = {
  items: [],
  totalAmount: 0
}

//reducer function
const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    // update amount is always this value
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

    //logic for update items(if item present already on cart or not)
    //1.First find the index of existing cart item 
    const existingCartItemIndex = state.items.findIndex((item) => {
      return item.id === action.item.id;
    })

    // 2. find that existing item 
    const existingCartItem = state.items[existingCartItemIndex];

    //3. check if the existing cart item is null or present
    let updatedItems;
    if (existingCartItem) {// if the item present
      const updatedItem = { //update that item only with amount change
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount
      }

      updatedItems = [...state.items]; //total type of items is same 
      updatedItems[existingCartItemIndex] = updatedItem; // now place that updated item to that index

    }
    else { // if the item is add to the cart first time
      updatedItems = state.items.concat(action.item); // it crete the the new variable and store ans in it
    }

    //const updatedItems = state.items.concat(action.item); 

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }
  if (action.type === 'REMOVE') {
    //1.First find the index of existing cart item 
    const existingCartItemIndex = state.items.findIndex((item) => {
      return item.id === action.id;
    })

    // 2. find that existing item 
    const existingCartItem = state.items[existingCartItemIndex];

    //decrease the price of a deleted item fro total amount
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;

    let updatedItems;
    if (existingCartItem.amount === 1) { // if only onr item there then remove on click
      updatedItems = state.items.filter((item) => {
        return item.id !== action.id; // remove whoose id of clicked and existing matched and return lefts
      })
    }
    else {
      const updatedItem = { ...existingCartItem, amount: existingCartItem.amount - 1 }
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };

  }

  //here check when order form is submit then clear the cart
  if (action.type === 'CLEAR') {
    return defaultCartState;
  }

  return defaultCartState;
}

function CartProvider(props) {
  //use reducer for updating the cart
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = item => {
    dispatchCartAction({ type: 'ADD', item: item });
  }

  const removeItemFromCartHandler = id => {
    dispatchCartAction({ type: 'REMOVE', id: id });
  }

  //function for clear cart handling
  const clearCartHandler = () => {
    dispatchCartAction({type: 'CLEAR'});
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler
  }

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;
