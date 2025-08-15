import Home from "./pages/Home";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ItemDetails from "./pages/ItemDetails";
import NewItems from "./components/home/NewItems";





function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/author" element={<Author />} />
       <Route path="/nft/:id" element={<ItemDetails />} />
        <Route path="/" element={<NewItems />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
