
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import Header from './components/Header';
import CartView from './components/CartView';
import './App.css'// client/src/App.js
import CustomItemContext from './context/ItemContext';

const App = () => {
	return (
		<CustomItemContext>
		   <Router>
			  <Header />
			  <Routes>
				<Route path="/" element={<ProductList />} />
                <Route path="/cart" element={<CartView />} />
				<Route path="*" element={<p>Page not found</p>} />
			  </Routes>
		   </Router>
		</CustomItemContext>
	);
};

export default App;



