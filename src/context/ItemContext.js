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
		setItemsInCart(cartData.items.reduce((total, item) => total + item.quantity, 0));
		setTotalPrice(cartData.total || 0);
	};
	// useEffect to load all the vegetables
	useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch("http://localhost:5001/api/books");
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
		
			const token = localStorage.getItem("token"); // Retrieve token from localStorage
			console.log('token:', token);

			if (!token) {
				console.warn("No token found, skipping cart fetch.");
				return;
			}
			
		try {
			const response = await fetch("http://localhost:5001/api/cart", {
			  method: "GET",
			  headers: {
				"Content-Type": "application/json",
				Authorization: token ? `Bearer ${token}` : "", // Attach token
			  },
			  credentials: "include", // Ensure cookies are sent (for cookie-based auth)
			});
			console.log('response:', response);
	  
			if (!response.ok) {
			  throw new Error(`HTTP error! status: ${response.status}`);
			}
	  
			const cartData = await response.json();
			setCart(cartData.items || []);
			setItemsInCart((cartData.items || []).length);
			setTotalPrice(cartData.total || 0);
		  } catch (error) {
			console.error("Error fetching cart:", error);
		  }
		};
	  
		fetchCart();
	  }, []);
	  
	
      
	  const addToCart = async (product) => {
		try {
			const token = localStorage.getItem("token");
			console.log('adding to cart:', product);
	
			const response = await fetch('http://localhost:5001/api/cart/add', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token ? `Bearer ${token}` : "", // Attached token
			},  credentials: "include", // Ensure cookies are sent (for cookie-based auth)
				body: JSON.stringify ({
					_id: product._id,  // ✅ Change `bookId` to `_id`
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
			const token = localStorage.getItem("token");
			console.log('removing from cart:', product);

		  const response = await fetch(`http://localhost:5001/api/cart/remove/${product._id}`, {
			method: 'DELETE',
			headers: {
				Authorization: token ? `Bearer ${token}` : "", // Attach token
			  },
			  credentials: "include",
			});

		  if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		  }

		  const updatedCart = await response.json();
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