// Profile.js

import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/profile.css";

export const Profile = () => {
    const { store, actions } = useContext(Context);
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token && store.auth) {
			setIsAuthenticated(true);
		} else {
			setIsAuthenticated(false);
		}
	}, [isAuthenticated]);

    useEffect(() => {
        const fetchProfile = async () => {
            const data = await actions.getProfile();
            if (data) {
                setProfile(data);
            } else {
                setError("Failed to fetch profile");
            }
        };
        fetchProfile();
    }, []);

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-container container">
            <h1>Profile</h1>
            <div className="profile-info">
                <p><strong>Email:</strong> {profile.logged_in_as}</p>
            </div>
        </div>
    );
};
