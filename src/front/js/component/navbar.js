import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			setIsAuthenticated(true);
		} else {
			setIsAuthenticated(false);
		}
	}, [isAuthenticated]);  

	const handleLogout = () => {
		setIsAuthenticated(false);
        actions.logout();
		navigate("/");
    };

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<Link to="/">
					<span className="navbar-brand mb-0 h1">About Us</span>
				</Link>
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Blog</span>
				</Link>
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Contact Us</span>
				</Link>
				<div className="ml-auto">
				{!isAuthenticated ? (
					<Link to="/login">Login</Link>
				) : (
					<button onClick={handleLogout}>Logout</button>
				)}
				</div>
			</div>
		</nav>
	);
};
