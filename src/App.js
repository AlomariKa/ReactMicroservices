import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Login from "./login";
import Orders from "./orders";
import CreateOrder from "./createorder";
import Register from "./register";

const App = () => {
    const token = localStorage.getItem("token");

    return (
      <>
      <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/register" />} />  
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/orders" element={token ? <Orders /> : <Navigate to="/login" />} />
                <Route path="/create-order" element={token ? <CreateOrder /> : <Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
      </>
        
    );
};

export default App;