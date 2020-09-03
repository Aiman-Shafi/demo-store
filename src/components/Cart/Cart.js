import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    console.log(cart);
    const totalPrice = cart.reduce((total, productInfo) => total + productInfo.price , 0 );
    
    return (
        <div>
            <h3>Order Summary</h3>
            <h5>Product in Cart: {cart.length}</h5>
            <h5>Total Price: {totalPrice} </h5>
        </div>
    );
};

export default Cart;