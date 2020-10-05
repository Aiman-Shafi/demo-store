import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.css'

const Cart = (props) => {
    const cart = props.cart;
    //const totalPrice = cart.reduce((total, productInfo) => total + productInfo.price * productInfo.quantity, 0 );
    let totalPrice = 0;
    for (let i=0 ; i < cart.length ; i++){
        const product = cart[i];
        totalPrice = totalPrice + (product.price * product.quantity);
        debugger;
    }

    let shipping = 20;
    
    if (totalPrice == 0)
        shipping = 0;
    
    else if (totalPrice <= 100)
        shipping = 20;

    else if (totalPrice <= 300)
        shipping = 10;

    else if (totalPrice <= 500)
        shipping = 5;

    else 
        shipping = 0;


    const tax = (totalPrice*.15).toFixed(2);
    const totalCost = (totalPrice+shipping+Number(tax)).toFixed(2);
    return (
        <div className='cartAdd'>
            
            <h2>Order Summary</h2>
            <h3>Product in Cart: {cart.length}</h3>
            <h5>Shipping Cost: $ {shipping.toFixed(2)}</h5>
            <h5>Tax 15%: $ {tax}</h5>
            <h4>Total Price: $ {totalCost} </h4>
            <Link to='/review'>
                 <button className='button'> Review Cart </button>
            </Link> 

        </div>
    );
};

export default Cart;