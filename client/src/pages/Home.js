import Box from "@mui/material/Box";
import { Navigation } from "../components/";

const Home = (props) => {
  return (
    <Box component="div">
      <Navigation />
      <h1>Welcome to Inventory Manager</h1>
      <p>Some flavor text</p>
    </Box>
  );
};

export default Home;
