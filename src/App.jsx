import Home from "./pages/Home";
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link, useParams } from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ItemDetails from "./pages/ItemDetails";
import NewItems from "./components/home/NewItems";
import ExploreItems from "./components/explore/ExploreItems";





function App() {
  return (
    <Router>
      <Nav />
      <Link to="/author"></Link>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/author/:id" element={<Author />} />
        <Route path="/item-details/:nftId" element={<ItemDetails />} />
        <Route path="/newitems" element={<NewItems />} />
        <Route path="/exploreitems" element={<ExploreItems />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
