// src/components/Header.js

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { ItemContext } from "../context/ItemContext";

const Header = () => {
	const { itemsInCart, totalPrice } = useContext(ItemContext);
	const navigate = useNavigate();

	return (
		<div className="header">
		  <h1 className="gfg" onClick={() => navigate('/')}>Philosopher's Stone</h1>
		  <h3 style={{ color: "green" }}>Total Price: ${totalPrice}</h3>
		  <div className="cart-num" onClick={() => navigate('/cart')}>
			<div className="cart-items">{itemsInCart}</div>
			<FontAwesomeIcon icon={faCartShopping} size="4x" />
		  </div>
		</div>
	  );
	};

export default Header;
