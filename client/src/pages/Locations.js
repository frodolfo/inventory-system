import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";

import {
  CollapsibleTable,
  Navigation,
  SearchForm,
  SearchResults,
} from "../components/";
// import { CollapsibleTable, Navigation } from "../components/";

const Locations = (props) => {
  const [locations, setLocations] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [inventoryTotal, setInventoryTotal] = useState(0.0);

  const getStores = async () => {
    let res, stores;
    try {
      res = await fetch("/api/stores/");
      stores = await res.json();
      if (Array.isArray(stores)) {
        setLocations([...stores]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const searchResultsCallback = (results, total) => {
    if (Array.isArray(results)) {
      setSearchResults([...results]);
    }

    if (!Number.isNaN(total)) {
      setInventoryTotal(total);
    }
  };

  const clearResultsCallback = () => {
    setSearchResults([]);
    setInventoryTotal(0.0);
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
            Inventory Manager
          </Typography>
          <SearchForm
            stores={locations}
            searchCallback={searchResultsCallback}
            clearCallback={clearResultsCallback}
          />
          <SearchResults
            results={searchResults}
            resultsTotal={inventoryTotal}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Store Locations
          </Typography>
          <CollapsibleTable rows={locations} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Locations;
