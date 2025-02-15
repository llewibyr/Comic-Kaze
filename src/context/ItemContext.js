// src/context/ItemContext.js

import { createContext, useEffect, useState } from "react";

const ItemContext = createContext();

// creating custom provider
const CustomItemContext = ({ children }) => {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState([]);
	const [itemsInCart, setItemsInCart] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0);

	const updateCartState = (cartData) => {
		setCart(cartData.items || []);
		setItemsInCart(cartData.items.reduce((total, item) => total + item.quanitity, 0));
		setTotalPrice(cartData.total || 0);
	};
	// useEffect to load all the vegetables
	useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch("http:/localhost:5001/api/book");
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const productsData = await response.json();
			setProducts(productsData);
          } catch (error) {
            console.error("Error fetching products:", error);
          }
        };
        fetchData();
      }, []);

	  useEffect(() => {
		const fetchCart = async () => {
		  try {
			const response = await fetch('http://localhost:5001/api/cart');
			if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
			const cartData = await response.json();
			setCart(cartData.items || []);
			setItemsInCart((cartData.items || []).length);
			setTotalPrice(cartData.total || 0);
		  } catch (error) {
			console.error('Error fetching cart:', error);
		  }
		};
		fetchCart();
	  }, []);
	
      
	  const addToCart = async (product) => {
		try {
			console.log('adding to cart:', product)
		  const response = await fetch('http://localhost:5001/api/cart/add', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify ({
				bookId: product._id,
				title: product.title,
				author: product.author,
				price: product.price,
                image: product.image,
			}),
		  });

		  if (!response.ok) {
			throw new Error(`HTTP error! ${response.status}`);
		  }

		  const updatedCart = await response.json();
		  updateCartState(updatedCart);
		  setCart(updatedCart.items || []);
		  setItemsInCart(updatedCart.items?.length || 0);
		  setTotalPrice(updatedCart.total || 0);
		} catch (error) {
		  console.error('Error adding to cart:', error);
		}
	  };
	

	  const removeFromCart = async (product) => {
		try {
			
		  const response = await fetch(`http://localhost:5001/api/cart/remove/${product._id}`, {
			method: 'DELETE',
		  });

		  if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		  }

		  const updatedCart = await response.json();
		  updateCartState(updatedCart);
		  setCart(updatedCart.items || []);
		  setItemsInCart(updatedCart.items?.length || 0);
		  setTotalPrice(updatedCart.total || 0);
		} catch (error) {
		  console.error('Error removing from cart:', error);
		}
	  };

	return (
		// default provider
		<ItemContext.Provider
			value={{
				products,
				cart,
				addToCart,
				removeFromCart,
				itemsInCart,
				totalPrice,
			}}
		>
			{children}
		</ItemContext.Provider>
	);
};


export { ItemContext };
export default CustomItemContext;
