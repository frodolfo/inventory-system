import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

// Pages
import Home from "./pages/Home";
import Locations from "./pages/Locations";

import "./App.scss";

const App = () => {
  return (
    <Box component="div">
      <Container maxWidth="lg">
        <Router>
          <Routes>
            <Route path="/locations" exact element={<Locations />} />
            <Route path="/products" exact element={<Home />} />
            <Route path="/contact-us" exact element={<Home />} />
            <Route path="/" exact element={<Home />} />
          </Routes>
        </Router>
      </Container>
    </Box>
  );
};

export default App;
