import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Login = () => {
    const [formData, setFormData] = useState({ identifier: "", password: "" });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("🔍 Sending Login Request to:", "http://localhost:5001/api/auth/login"); // Debug log
        
        try {
            const res = await axios.post("http://localhost:5001/api/auth/login", formData, {
                headers: { "Content-Type": "application/json" }, // ✅ Ensure proper headers
            });

            console.log("🚀 Successfully logged in:", res.data); // Debug log
            login(res.data.token);
            navigate("/cart");
        } catch (error) {
            console.error("Login error:", error.response?.data || error);
            alert(error.response.data.error || "Login failed. Please try again.");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="identifier" placeholder="Username or Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
