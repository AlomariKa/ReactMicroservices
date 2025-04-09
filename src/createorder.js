import { useState } from "react";
import { createOrder } from "./api";
import {Link,useNavigate} from "react-router-dom";
import "./styles.css";

const CreateOrder = () => {
    const [skuCode, setSkuCode] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();  // Hook for navigation

    const handleCreateOrder = async () => {
        try {
            const response = await createOrder(
                { skuCode, quantity, price },token   );    
            console.log("Order created:", response.data);
            navigate("/orders");

        } catch (error) {
            console.error("Failed to create order", error);
        }
    };

    return (
        <>
        <div className="container">
            <h2>Create Order</h2>
            <input type="text" placeholder="SKU Code" onChange={(e) => setSkuCode(e.target.value)} />
            <input type="number" placeholder="Quantity" onChange={(e) => setQuantity(e.target.value)} />
            <input type="text" placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
            <button onClick={handleCreateOrder}>Create Order</button>
        </div>
         <Link to='/orders' className="Link">Back</Link>
         </>
    );
};

export default CreateOrder;