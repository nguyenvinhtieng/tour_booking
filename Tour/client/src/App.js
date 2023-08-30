import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Tour from "./pages/tour/Tour";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Wallet from "./pages/wallet/Wallet";
import Register from "./pages/register/register";
import axios from "axios";
import Services from "./pages/services/Services";
import Discount from "./pages/discount/Discount";
function App() {

  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/tours" element={<List/>}/>
        <Route path="/tours/:id" element={<Tour/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/wallet" element={<Wallet/>}/>
        <Route path="/services" element={<Services/>}/>
        <Route path="/discount" element={<Discount/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;