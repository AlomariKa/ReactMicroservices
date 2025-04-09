import { useState } from "react";
import { register } from "./api";
import { Link,useNavigate} from "react-router-dom";
import "./styles.css";
const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();  // Hook for navigation

    const handleRegister = async () => {
        try {
            const response = await register({ username, password });
            console.log("Message:", response.data);
            navigate("/login");

        } catch (error) {
            console.error("Failed to create order", error);
        }
    };

    return (
        <>
        <div className="container"> 
            <h2>Register</h2>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Register</button>
        </div>
        <Link to='/login' className="Link">Login</Link>
        </>
    );
};

export default Register;