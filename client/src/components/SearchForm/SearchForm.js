import React, { useEffect, useState } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";

const defaultValues = {
  item: "",
};

const SearchForm = ({ stores, searchCallback, clearCallback }) => {
  const [dataStore, setDataStore] = useState(stores);
  const [formValues, setFormValues] = useState(defaultValues);

  const textInput = React.useRef(null);

  const getStores = async () => {
    let res, locations;
    try {
      res = await fetch("/api/stores/");
      locations = await res.json();
      if (Array.isArray(locations)) {
        setDataStore([...locations]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getStores();
  }, []);

  const findProduct = async (productName) => {
    let products = [];

    try {
      let product;
      let totalPrice = 0;

      if (!productName) {
        for (const store of dataStore) {
          for (const product of store.inventory) {
            totalPrice += product.price * product.quantity;
            products.push({
              store: store.name,
              product,
            });
          }
        }
        searchCallback(products, totalPrice);
      } else {
        for (const store of dataStore) {
          product = store.inventory.find(
            (i) => i.item.toLowerCase() === productName.toLowerCase()
          );

          if (product) {
            totalPrice += product.price * product.quantity;
            products.push({
              store: store.name,
              product,
            });
          }
        }
        searchCallback(products, totalPrice);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    findProduct(formValues.item);
  };

  const handleClear = (event) => {
    event.preventDefault();
    textInput.current.value = "";
    setFormValues({
      item: "",
    });

    clearCallback();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container alignItems="left" justify="center" direction="column">
        <Grid item>
          <Box sx={{ margin: "5px 0 15px" }}>
            <TextField
              id="productName"
              inputRef={textInput}
              name="item"
              label="Search Product Name"
              type="text"
              value={formValues.item}
              onChange={handleInputChange}
            />
          </Box>
          <Box>
            <Button
              sx={{ mr: 2 }}
              variant="contained"
              color="primary"
              type="submit"
            >
              Search
            </Button>
            <Button
              variant="contained"
              color="secondary"
              type="button"
              onClick={handleClear}
            >
              Clear
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default SearchForm;
