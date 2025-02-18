import React, { useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { ItemContext } from "../context/ItemContext";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { itemsInCart, totalPrice } = useContext(ItemContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="header">
      {/* Site Title (Clickable) */}
      <h1 className="gfg" onClick={() => navigate("/")}>Philosopher's Stone</h1>

      {/* Navigation Links */}
      <nav className="nav-links">
        <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>Home</NavLink>
        <NavLink to="/products" className={({ isActive }) => isActive ? "active-link" : ""}>Products</NavLink>
        <NavLink to="/cart" className={({ isActive }) => isActive ? "active-link" : ""}>Cart</NavLink>
        
		{!user ? (
          <>
            <NavLink to="/register" className={({ isActive }) => isActive ? "active-link" : ""}>Register</NavLink>
            <NavLink to="/login" className={({ isActive }) => isActive ? "active-link" : ""}>Login</NavLink>
          </>
        ) : (
          <button className="logout-btn" onClick={() => { logout(); navigate("/login"); }}>
            Logout
          </button>
        )}
      </nav>

      {/* Cart Display */}
      <h3 style={{ color: "green" }}>Total Price: ${totalPrice}</h3>
      <div className="cart-num" onClick={() => navigate("/cart")}>
        <div className="cart-items">{itemsInCart}</div>
        <FontAwesomeIcon icon={faCartShopping} size="4x" />
      </div>
    </div>
  );
};

export default Header;
