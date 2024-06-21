
import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/login.css";


export const Login= () => {
    const { store, actions } = useContext(Context);
    const [user, setUser] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Sending Data");
        const response = await actions.login(user);
        if (response) {
            navigate("/profile");
        } else {
            setError("Invalid email or password");
        }
    };

    return (
        <>
            <div className="wrapper m-5">
                <span className="bg-animate"></span>
                <span className="bg-animate2"></span>

                <div className="form-box login">
                        <h2>Login</h2>
                        <form  onSubmit={handleSubmit}>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <div className="input-box">
                            <input
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                type="email"
                                name="email"
                                value={user.email}
                                id="inputEmail"             
                            />
                            <label htmlFor="inputEmail">Email</label>
                            <i className="bi bi-person-fill"></i>
                        </div>
                        <div className="input-box">
                            <input
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                type="password"
                                
                                name="password"
                                value={user.password}
                                id="inputPassword"
                               
                            />
                            <label htmlFor="inputPassword">Password</label>
                            <i className="bi bi-lock-fill"></i>
                        </div>
                        <button type="submit" className="btn">Login</button>
                        <div className="logreg-link">
                            <p>Don't have an account?
                            <Link to="/signup">
                                 Signup
                            </Link>
                            </p>
                        </div>
                    </form>
                </div>
                <div className="info-text login">
                    <h2>WELCOME BACK!</h2>
                    <p>lorem ipsum, dolor sit amet consectetur adipisicing </p>
                </div>
            </div>
            
        </>
    );
};
