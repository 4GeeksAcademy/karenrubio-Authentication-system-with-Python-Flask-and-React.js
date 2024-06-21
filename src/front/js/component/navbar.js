import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	
  
   useEffect (()=>{
	{store.auth}
   },[store.auth])

	const handleLogout = () => {
        actions.logout();
		navigate("/");
    };

	return (
		<nav className="navbar m-5 p-3 ">
			<div className="container">
				<Link to="/">
					<span className="text-white-50 m-3">React Boilerplate</span>
				</Link>
				<Link to="/">
					<span className="text-white-50 m-3">About Us</span>
				</Link>
				<Link to="/">
					<span className="text-white-50 m-3">Blog</span>
				</Link>
				<Link to="/">
					<span className="text-white-50 m-3">Contact Us</span>
				</Link>
				<div className="ml-auto">
					{store.auth && <Link to="/">
					<span className="btn " onClick={handleLogout}>Logout</span>
				</Link>}
				 
				</div>
			</div>
		</nav>
	);
};
