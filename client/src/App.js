import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Box, Container } from "@mui/material";

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
            <Route path="/products" exact element={<Locations />} />
            <Route path="/contact-us" exact element={<Locations />} />
            <Route path="/" exact element={<Locations />} />
          </Routes>
        </Router>
      </Container>
    </Box>
  );
};

export default App;
