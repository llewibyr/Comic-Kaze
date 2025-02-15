// client/src/components/ProductItem.js

import React, { useContext } from "react";
import { ItemContext } from "../context/ItemContext";

const ProductItem = ({ product}) => {
	const {addToCart, removeFromCart} = useContext(ItemContext);

	const handleAddToCart = () => {
		if (!product || !product._id) {
			console.error('invalid product');
			return;
		}
		console.log('product being added:', product);
		addToCart(product);
	};

	const handleRemoveFromCart = () => {
		if (!product ||!product._id) {
            console.error("invalid product");
            return;
        }
		console.log("product being removed:", product);
		removeFromCart(product);
	};

	return (
		<div className="product-card">
			<img
			  className="product-image"
			  src={product.image}
			  alt={product.title}
			  />
			  <div className="product-details">
			  <h3 style={{fontWeight: "700"}}>{product.title}</h3>
			  <p style={{fontWeight: "300"}}>{product.decription}</p>
			  <p style={{fontWeight: "500"}}>Price: ${product.price}</p>
			  <p>{product.genre}</p>
			  <p style={{fontWeight: "700", color: "brown"}}>
				{product.author}
			  </p>
			  <button onClick={handleAddToCart}>
				Add to Cart
				</button>
			  <button onClick={handleRemoveFromCart}>
				Remove from Cart
				</button>
			  </div>
			</div>
	);
};

export default ProductItem;