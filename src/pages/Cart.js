import { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const Cart = () => {
    const [cart, setCart] = useState(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const res = await axios.get("http://localhost:5001/api/cart", {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                setCart(res.data);
            } catch (error) {
                console.error("Error fetching cart:", error);
            }
        };

        fetchCart();
    }, [user]);

    if (!cart) return <p>Loading cart...</p>;

    return (
        <div>
            <h2>Your Cart</h2>
            {cart.items.length === 0 ? <p>Cart is empty.</p> : cart.items.map(item => (
                <div key={item.bookId}>
                    <h3>{item.title}</h3>
                    <p>Price: ${item.price}</p>
                </div>
            ))}
        </div>
    );
};

export default Cart;
