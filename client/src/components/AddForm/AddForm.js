import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";

import StoreContext from "../../context/StoreContext";

const defaultValues = {
  id: "",
  location: "",
  item: "",
  price: 0.0,
  quantity: 0,
};

const AddForm = ({ stores, addCallback, modalCloseCallback }) => {
  const [dataStore, setDataStore] = useState(stores);
  const [formValues, setFormValues] = useState(defaultValues);
  const [successOpen, setSuccessOpen] = useState(false);
  const [failureOpen, setFailureOpen] = useState(false);

  const textInput = React.useRef(null);
  const contextValue = useContext(StoreContext);

  useEffect(() => {
    setDataStore([...contextValue]);
  }, [contextValue]);

  const checkProduct = (product) => {
    let selectedStore = dataStore.find((store) => {
      return store.name.toLowerCase() === product.location.toLowerCase();
    });
    let found = dataStore.find((store) => {
      return store.inventory.find((i) => {
        return i.item.toLowerCase() === product.item.toLowerCase();
      });
    });

    if (found) {
      setSuccessOpen(false);
      setFailureOpen(true);
    } else {
      addCallback(product, selectedStore._id);
    }
  };

  const addProduct = async (product) => {
    checkProduct(product);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessOpen(false);
    setFailureOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let currentFormValues = { ...formValues };
    currentFormValues[name] = value;
    setFormValues(currentFormValues);
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    let currentFormValues = { ...formValues };
    currentFormValues[name] = value;
    setFormValues(currentFormValues);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addProduct(formValues);
  };

  const handleCancel = (event) => {
    modalCloseCallback();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container alignItems="left" justify="center" direction="column">
        <Grid item>
          <Box sx={{ margin: "5px 0 15px" }}>
            <Snackbar
              open={successOpen}
              autoHideDuration={3000}
              onClose={handleClose}
            >
              <Alert severity="success" sx={{ width: "320px" }}>
                Product has been added successfully.
              </Alert>
            </Snackbar>
            <Snackbar
              open={failureOpen}
              autoHideDuration={3000}
              onClose={handleClose}
            >
              <Alert severity="error" sx={{ width: "320px" }}>
                This product already exists.
              </Alert>
            </Snackbar>
          </Box>
        </Grid>
        <Grid item>
          <Box sx={{ margin: "5px 0 15px" }}>
            <TextField
              id="productName"
              inputRef={textInput}
              name="item"
              label="Product Name"
              type="text"
              value={formValues.item || ""}
              onChange={handleInputChange}
              required
              sx={{ width: "350px" }}
            />
          </Box>
          <Box sx={{ margin: "5px 0 15px" }}>
            <TextField
              id="productPrice"
              name="price"
              label="Unit Price"
              type="text"
              value={formValues.price || ""}
              onChange={handleInputChange}
              required
            />
          </Box>
          <Box sx={{ margin: "5px 0 15px" }}>
            <TextField
              id="productQuantity"
              name="quantity"
              label="Unit Quantity"
              type="text"
              value={formValues.quantity || ""}
              onChange={handleInputChange}
              required
            />
          </Box>
          <Box sx={{ margin: "5px 0 15px" }}>
            <FormControl sx={{ width: "350px" }}>
              <InputLabel id="location">Location</InputLabel>
              <Select
                labelId="location"
                id="location"
                value={formValues.location || ""}
                label="location"
                name="location"
                onChange={handleSelectChange}
              >
                {dataStore.map((store) => (
                  <MenuItem key={store.name} value={store.name}>
                    {store.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <Button
              sx={{ mr: 2 }}
              variant="contained"
              color="primary"
              type="submit"
            >
              Add
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddForm;
