// Profile.js

import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/profile.css";

export const Profile = () => {
    const { store, actions } = useContext(Context);
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
  


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
            <h1 className="text-white-50 m-5">Profile</h1>
            <div className="profile-info">
                <h2 className="text-white">WELCOME BACK</h2>   
                <p className="text-white-50 m-3"><i className="bi bi-person-square text-white-50"></i><strong className="text-white-50 m-3">Email:</strong> {profile.logged_in_as}</p>
            </div>
        </div>
    );
};
