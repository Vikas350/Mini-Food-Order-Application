import React, { useContext, useState } from 'react';
import './Cart.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem'
import Checkout from './Checkout';

function Cart(props) {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false); //state for handling submit state
    const [didSubmit, setDidSubmit] = useState(false); //for sending success msg after submit

    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

    const hasItems = cartCtx.items.length > 0;

    const cartItemAddHandler = item => {
        cartCtx.addItem({ ...item, amount: 1 })
    }

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    }

    const orderHandler = () => {
        setIsCheckout(true);
    }

    //submit data from here -> because checkout componenet is used here
    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        //here we put data on server through POST request
        await fetch('https://react-http-b0804-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        })
        setIsSubmitting(false);
        setDidSubmit(true); //here our form finally submit
        cartCtx.clearCart(); //clear the cart after this
    }

    const cartItems = (
        <ul className='cart-items'>
            {cartCtx.items.map((item) => (
                <CartItem
                    id={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            ))}
        </ul>
    );

    const modalActions =
        <div className='actions'>
            <button className='button--alt' onClick={props.onClose}>Close</button>
            {hasItems && <button className='button' onClick={orderHandler}>Order</button>}
        </div>

    const cartModalContent = (
        <React.Fragment>
            {cartItems}
            <div className='total'>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
            {!isCheckout && modalActions}

        </React.Fragment>
    );

    //this will show when our data is submitting
    const isSubmittingModalContent = <p>Sending ordered Data...</p>

    ////this willl show when our order is finaly done
    const didSubmitModalContent = (
        <React.Fragment>
            <p>Successfully sent the Order!</p>
            <div className='actions'>
                <button className='button' onClick={props.onClose}>Close</button>
            </div>
        </React.Fragment>
    )

    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    )
}

export default Cart
