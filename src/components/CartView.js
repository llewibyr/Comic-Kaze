//Shows the items in the cart and allows the user to remove items from the cart. It also shows the total price of the items in the cart. 


import React, { useContext } from 'react';
import { ItemContext } from '../context/ItemContext';

const CartView = () => {
    const { cart, removeFromCart, totalPrice } = useContext(ItemContext);
  
    return (
      <div className="cart-container">
        <h2>Shopping Cart</h2>
        {cart.map((item) => (
          <div key={item._id || item.bookId?.toString()} className="cart-item">
            <img src={item.image} alt={item.title} className="cart-item-image" />
            <div className="cart-item-details">
              <h3>{item.title}</h3>
              <p>Author: {item.author}</p>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => {
                   removeFromCart(item._id || item.bookId?._id || item.bookId);
                  }}>
                    Remove One
                </button>
            </div>
          </div>
        ))}
        <div className="cart-total">
          <h3>Total: ${totalPrice}</h3>
        </div>
      </div>
    );
  };
  
  export default CartView;