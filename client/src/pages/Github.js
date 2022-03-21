import { Box, Link } from "@mui/material";
import { Navigation } from "../components/";

const Github = (props) => {
  return (
    <Box component="div">
      <Navigation />
      <h1>Source Code</h1>
      <p>
        This source code for this application is located on{" "}
        <Link
          href="https://github.com/frodolfo/inventory-system"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </Link>
        .
      </p>
    </Box>
  );
};

export default Github;
