import React from 'react';
import gifImage from '../../images/giphy.gif';

const PlaceOrder = () => {
    return (
        <div>
            <h1><center>Your Order has been Placed</center></h1>
            <center><img src={gifImage} alt=""/></center>
        </div>
    );
};

export default PlaceOrder;