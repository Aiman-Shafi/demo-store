import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';


const Product = (props) => {
    // console.log(props.productInfo);
    const {name, seller, price, img, stock, key} = props.productInfo;
    return (
        <div className='product'>
            <div className='image'> 
                <img src={img} alt=""/>
            </div>
            
            <div className="details">
                <h3>{name}</h3>
                <p><b>${price}</b></p>
                <p>Brand: {seller}</p>
                <p>Product In Stock: {stock}</p>
                <button className="button" onClick={()=> props.addtoCart(props.productInfo)}> <FontAwesomeIcon icon={faShoppingCart} /> Add to cart </button>
            </div>

        </div>
    );
};

export default Product;