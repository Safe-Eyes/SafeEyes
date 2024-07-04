import React from "react";
import Courses from "./pages/category";
import Contact from "./pages/contact";
import Listing from "./pages/listing";
import Index from "./pages/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";

function App() {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<Listing />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  ); 
}

export default App;