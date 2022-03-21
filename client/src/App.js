import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Box, Container } from "@mui/material";

// Pages
import Home from "./pages/Home";
import Manager from "./pages/Manager";
import Github from "./pages/Github";

import "./App.scss";

const App = () => {
  return (
    <Box component="div">
      <Container maxWidth="lg">
        <Router>
          <Routes>
            <Route path="/manager" exact element={<Manager />} />
            <Route path="/github" exact element={<Github />} />
            <Route path="/" exact element={<Home />} />
          </Routes>
        </Router>
      </Container>
    </Box>
  );
};

export default App;
