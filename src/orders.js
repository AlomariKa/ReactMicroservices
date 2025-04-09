import {useEffect, useState } from "react";
import { fetchOrders } from "./api";
import { Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";  // ✅ Correct Import
import "./styles.css";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();  // ✅ Define navigate

    useEffect(() => {
        const getOrders = async () => {
            try {
                const response = await fetchOrders(token);
                setOrders(response.data);
            } catch (error) {
                console.error("Failed to fetch orders", error);
            }
        };

        getOrders();
    }, []);


    useEffect(() => {
        if (!token) {
            navigate("/login", { replace: true });  // ✅ Use `replace: true` to prevent going back
        }
    }, [token, navigate]);


    return (
        <>
        <div className="container">
            <h2>Your Orders</h2>
            <ul>
                {orders.map(order => (
                    <li key={order.id}>
                        SKU: {order.skuCode} | Quantity: {order.quantity} | Price: {order.price}
                    </li>
                ))}
            </ul>
            <button className="logout-button" onClick={() => {
                localStorage.removeItem("token");  // ✅ Remove token
                navigate("/login", { replace: true });  // ✅ Prevent going back
            }}>Log Out</button>

        </div>
        <Link to='/create-order' className="Link">Create New Order</Link>
        </>
    );
};

export default Orders;