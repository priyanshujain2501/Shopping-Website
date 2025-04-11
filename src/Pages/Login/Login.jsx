import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { Context } from "../../Context/Context";

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {login} = useContext(Context)

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        
        e.preventDefault();

        const data = {
            username: username, 
            password: password,
        }

        try {

            const res = await axios.post('https://fakestoreapi.com/auth/login', data);

            if (res.status === 200) {

                login(res.data.token);
                navigate("/");

            } 
            else {
                console.log("Invalid credentials");
            }

        } 
        catch (error) {
            console.log("Something went wrong.");
        }
        
    }

    return (
        <div className="login-container">

            <form onSubmit={handleLogin} className="login-form">

                <h2>Login</h2>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Login</button>

            </form>

        </div>
    );
}

export default Login;
