import {  useState } from "react";
import { loginUser } from "./api";
import { Link,useNavigate } from "react-router-dom";
import "./styles.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await loginUser({ username, password });
            localStorage.setItem("token", response.access_token);  // Store token
            navigate("/orders");  // Redirect to orders page
        } catch (error) {
            console.error("Login failed", error);
        }
    };


    return (
        <>
        <div className="container">
            <h2>Login</h2>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
        <Link to='/register' className="Link">Register</Link>
         </>
    );
};

export default Login;