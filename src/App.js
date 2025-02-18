import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import Header from './components/Header';
import CartView from './components/CartView';
import './App.css'// client/src/App.js
import CustomItemContext from './context/ItemContext';
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Home from "./pages/Home";

const App = () => {
	return (
	  <CustomItemContext>
		<AuthProvider>
		  <Router>
			<Header />
			<Routes>
			  <Route path="/" element={<Home />} />
			  <Route path="/register" element={<Register />} />
			  <Route path="/login" element={<Login />} />
			  <Route path="/products" element={<ProductList />} />
			  <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
			  <Route path="/cart-view" element={<CartView />} />
			  <Route path="*" element={<p>Page not found</p>} />
			</Routes>
		  </Router>
		</AuthProvider>
	  </CustomItemContext>
	);
  };
  
  export default App;