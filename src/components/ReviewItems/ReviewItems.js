import React from 'react';
import './ReviewItems.css'

const ReviewItems = (props) => {
    const {name, quantity, price, key} = props.product
    return (
        <div className='cart-items'>
            <h5>{name}</h5>
            <p>Qunatity: {quantity}</p>
            <p style={{fontWeight:'bold', color:'red'}}>Price: $ {price}</p>
            <button onClick={() => props.removeProduct(key)} className='button'>Remove</button>
        </div>
    );
};

export default ReviewItems;