import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

import { Navigation } from "../components/";

import axios from "axios";

const Locations = (props) => {
  const [locations, setLocations] = useState([]);

  const getStores = async () => {
    const stores = await axios.get("/api/stores/");
    if (Array.isArray(stores)) {
      setLocations([...stores]);
    }
  };

  useEffect(() => {
    getStores();
  }, []);

  return (
    <Box component="div">
      <Navigation />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Store Locations
          </Typography>
          <List>
            {locations.map((location) => (
              <ListItem>
                <ListItemText
                  primary={location.name}
                  secondary={"Inventory total:" + location.inventory.length}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Locations;
