
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	const handleLogout = () => {
        actions.logout();
		navigate("/")
        
    };

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button onClick={handleLogout} className="btn btn-primary">Logout</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
