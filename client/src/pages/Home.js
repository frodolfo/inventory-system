import { Box, Typography } from "@mui/material";
import { Navigation } from "../components/";

const Home = (props) => {
  return (
    <Box component="div">
      <Navigation />
      <h1>Welcome to Inventory Manager</h1>
      <p>
        This is a basic MERN stack based application addressing the following
        use-case:
      </p>
      <p>
        The case application needed to create is an inventory system for a small
        business that has 3 locations: NorthEast, SouthEast, SouthWest.  The
        business owners need a way to input new items and assign a quantity to a
        given location.  The owners need to know what items each location has,
        the number of items, and the monetary value of a given item for a single
        location or all locations.
      </p>
      <p>
        This prototype fulfills three main components:
        <ul>
          <li>Create an API to serve the data. (localhost)</li>
          <li>Create a simple React application that can solve the problem</li>
          <li>A persistent data storage layer</li>
        </ul>
      </p>
      <p>
        For example, Ketchup can be an item that costs $5.00 per unit.  The
        NorthEast location has 2 units totaling $10.00 and the SouthEast
        location has 4 units totaling $20.00.  The total value of Ketchup is 6
        bottles and $30.
      </p>
      <p>
        <Typography variant="h6">Constraints:</Typography>
        <ul>
          <li>The data must be persistent</li>
          <li>The frontend must be written in React + Material UI</li>
        </ul>
      </p>
      <p>
        <Typography variant="h6">Caveats:</Typography>
        <ul>
          <li>I did not use best practices for the overall layout</li>
          <li>
            The primary focus for this case is the implementation of
            requirements
          </li>
          <li>Validation of input data and data types isn't performed</li>
          <li>You can only add new products</li>
          <li>Product deletion isn't implemented</li>
        </ul>
      </p>
    </Box>
  );
};

export default Home;
