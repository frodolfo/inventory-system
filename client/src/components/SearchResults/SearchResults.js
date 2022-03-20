import React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const SearchResults = ({ results, resultsTotal }) => {
  return (
    Array.isArray(results) &&
    results.length > 0 && (
      <Box>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Search Results
        </Typography>
        <TableContainer sx={{ mt: 4, mb: 2 }} component={Paper}>
          <Table size="small" aria-label="purchases">
            <TableHead>
              <TableRow>
                <TableCell>Location</TableCell>
                <TableCell>Product</TableCell>
                <TableCell align="right">Item Price</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((result) => (
                <TableRow key={result.store + result.product.item}>
                  <TableCell>{result.store}</TableCell>
                  <TableCell>{result.product.item}</TableCell>
                  <TableCell align="right">
                    ${((result.product.price * 100) / 100).toFixed(2)}
                  </TableCell>
                  <TableCell align="right">{result.product.quantity}</TableCell>
                  <TableCell align="right">
                    $
                    {(
                      (result.product.price * result.product.quantity * 100) /
                      100
                    ).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell align="right" colSpan={4}>
                  <Typography sx={{ fontWeight: "bold" }}>Total</Typography>
                </TableCell>
                <TableCell align="right">${resultsTotal.toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    )
  );
};

export default SearchResults;
