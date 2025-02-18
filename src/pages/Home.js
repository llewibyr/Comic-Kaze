import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ItemContext } from "../context/ItemContext";
import { AuthContext } from "../context/AuthContext";

import ProductList from "../components/ProductList";

const Home = () => {
  const { cart, totalPrice } = useContext(ItemContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      <div className="home-container">
        <section className="welcome-section">
          <h1>Welcome to Philosopher's Stone</h1>
          <p>Your one-stop shop for classic literature, comics, and rare books!</p>
          {!user ? (
            <div className="auth-links">
              <button onClick={() => navigate("/")} className="auth-btn">Register</button>
              <button onClick={() => navigate("/login")} className="auth-btn">Login</button>
            </div>
          ) : (
            <p className="welcome-user">Welcome back, happy reading!</p>
          )}
        </section>

        <section className="products-section">
          <h2>Explore Our Collection</h2>
          <ProductList /> {/* Display available books */}
        </section>

        <section className="cart-summary">
          <h2>Cart Summary</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <ul>
                {cart.map((item) => (
                  <li key={item.bookId}>
                    {item.title} - ${item.price} (x{item.quantity})
                  </li>
                ))}
              </ul>
              <p><strong>Total Price:</strong> ${totalPrice}</p>
              <button className="checkout-btn" onClick={() => navigate("/cart")}>Go to Cart</button>
            </>
          )}
        </section>
      </div>
    </>
  );
};

export default Home;
