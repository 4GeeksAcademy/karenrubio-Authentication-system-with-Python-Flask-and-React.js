
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
            {/* <nav className="login-navbar navbar m-5" style={{ background: "transparent" }}>
                <div className="ml-auto">
                    <Link to="/signup">
                        <span className="login-navbar-brand navbar-brand mb-0 h1" style={{ fontSize: "50px" }}>Signup</span>
                    </Link>
                </div>
            </nav> */}
            <div className="wrapper">
                <div className="form-box login">
                    <form className="login-container container wrapper" onSubmit={handleSubmit}>
                        <h2>Login</h2>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <div className="login-form-floating form-floating mb-3 input-box">
                            <input
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                type="email"
                                className="login-form-control form-control"
                                name="email"
                                value={user.email}
                                id="inputEmail"
                                placeholder="Enter Email"
                            />
                            <label htmlFor="inputEmail">Email</label>
                            <i class="bi bi-person-fill"></i>
                        </div>
                        <div className="login-form-floating form-floating mb-3">
                            <input
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                type="password"
                                className="login-form-control form-control"
                                name="password"
                                value={user.password}
                                id="inputPassword"
                                placeholder="Enter Password"
                            />
                            <label htmlFor="inputPassword">Password</label>
                            <i class="bi bi-lock-fill"></i>
                        </div>
                        <button type="submit" className="login-btn btn btn-primary">Login</button>
                        <div className="logreg-link">
                            <p>Don't have an account?
                            <Link to="/signup">
                                Signup
                                {/* <span className="register-link login-navbar-brand navbar-brand mb-0 h1" style={{ fontSize: "50px" }}>Signup</span> */}
                            </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
            
        </>
    );
};
