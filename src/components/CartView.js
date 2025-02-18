//Shows the items in the cart and allows the user to remove items from the cart. It also shows the total price of the items in the cart. 
import React, { useContext } from 'react';
import { ItemContext } from '../context/ItemContext';
import AuthContext from '../context/AuthContext';
import axios from 'axios';

const CartView = () => {
    const { user } = useContext(AuthContext);
    const { cart, setCart, totalPrice } = useContext(ItemContext);

    // Function to remove a single item from cart
    const removeFromCart = async (bookId) => {
      try {
          if (!user) {
              alert("Please log in to manage your cart.");
              return;
          }
          const res = await axios.delete(`http://localhost:5001/api/cart/remove/${bookId}`, {
              headers: { Authorization: `Bearer ${user.token}` }
          });

          setCart(res.data); // Update cart state
      } catch (error) {
          console.error("Error removing item:", error);
          alert("Failed to remove item from cart.");
      }
  };

  // Function to clear entire cart
  const clearCart = async () => {
    try {
        if (!user) {
            alert("Please log in to manage your cart.");
            return;
        }
        const res = await axios.delete("http://localhost:5001/api/cart/clear", {
            headers: { Authorization: `Bearer ${user.token}` }
        });

        setCart(res.data); // Update cart state
    } catch (error) {
        console.error("Error clearing cart:", error);
        alert("Failed to clear cart.");
    }
};
  
    return (
      <div className="cart-container">
        <h2>Shopping Cart</h2>
        {cart?.items?.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
        cart.map((item) => (
          <div key={item.bookId?._id || item.bookId} className="cart-item">
          <img src={item.image} alt={item.title} className="cart-item-image" />
          <div className="cart-item-details">
              <h3>{item.title}</h3>
              <p>Author: {item.author}</p>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => {
                   removeFromCart( item.bookId?._id || item.bookId);
                  }}>
                    Remove One
                </button>
            </div>
          </div>
        )
        ))}
        <div className="cart-total">
          <h3>Total: ${totalPrice}</h3>
        </div>
        {/* Clear Cart Button */}
        {cart?.items?.length > 0 && (
                <button className="clear-cart-button" onClick={clearCart}>
                    Clear Cart
                </button>
            )}
      </div>
    );
}
  
export default CartView;