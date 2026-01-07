import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Wishlist from "./pages/Wishlist";
import Navbar from "./components/Navbar";

function App() {
  const[wishlist,setWishlist]=useState([]);

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails wishlist={wishlist} setWishlist={setWishlist}/>}/>
        <Route path="/wishlist" element={<Wishlist wishlist={wishlist} />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

