import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Categories from "./components/CategoryList";
import Items from "./components/Items";
import Wishlist from "./components/wishlist";
import ItemDetails from "./components/Itemdetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
function App() {
  return (
    
    <BrowserRouter>
      <Navbar/>
      <ToastContainer />
      <Routes>
        <Route path = "/home" element = {<Home/>}/>
        <Route path="/" element={<Categories />} />
        <Route path="/category/:type" element={<Items />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/details/:id" element={<ItemDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
