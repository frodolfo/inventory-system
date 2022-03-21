import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Grid,
  Modal,
  Snackbar,
  Typography,
} from "@mui/material";
import {
  AddForm,
  CollapsibleTable,
  Navigation,
  SearchForm,
  SearchResults,
} from "../components";

import StoreContext from "../context/StoreContext";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Manager = (props) => {
  const [locations, setLocations] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [inventoryTotal, setInventoryTotal] = useState(0.0);
  const [successOpen, setSuccessOpen] = useState(false);
  const [failureOpen, setFailureOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

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

  const addProductCallback = async (product, id) => {
    if (!product || !id) {
      setFailureOpen(true);
      return;
    }

    try {
      const rawResponse = await fetch(`/api/stores/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item: product.item,
          price: product.price,
          quantity: product.quantity,
        }),
      });

      const content = await rawResponse.json();

      if (content.errors) {
        setSuccessOpen(false);
        setFailureOpen(true);
      } else {
        getStores();
        setFailureOpen(false);
        setSuccessOpen(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessOpen(false);
    setFailureOpen(false);
  };

  useEffect(() => {
    getStores();
  }, []);

  return (
    <StoreContext.Provider value={locations}>
      <Box component="div">
        <Navigation />
        <Box sx={{ margin: "5px 0 15px" }}>
          <Snackbar
            open={successOpen}
            autoHideDuration={4000}
            onClose={handleClose}
          >
            <Alert severity="success" sx={{ width: "320px" }}>
              Product has been added successfully.
            </Alert>
          </Snackbar>
          <Snackbar
            open={failureOpen}
            autoHideDuration={4000}
            onClose={handleClose}
          >
            <Alert severity="error" sx={{ width: "320px" }}>
              Uh-oh, an error was encountered.
            </Alert>
          </Snackbar>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              Inventory Manager
            </Typography>
            <SearchForm
              searchCallback={searchResultsCallback}
              clearCallback={clearResultsCallback}
            />
            <Grid item xs={12} md={12}>
              <Box sx={{ mt: 2 }}>
                <Button
                  sx={{ mr: 2 }}
                  size="small"
                  variant="outlined"
                  color="info"
                  onClick={handleModalOpen}
                >
                  Add Product
                </Button>
              </Box>
              <Modal
                open={modalOpen}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={modalStyle}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Add Product
                  </Typography>
                  <AddForm
                    stores={locations}
                    addCallback={addProductCallback}
                    modalCloseCallback={handleModalClose}
                  />
                </Box>
              </Modal>
            </Grid>
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
    </StoreContext.Provider>
  );
};

export default Manager;
