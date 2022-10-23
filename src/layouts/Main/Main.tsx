import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";


import { Navbar, ProgressDrawer } from "./components";

interface Props {
  children: React.ReactNode;
}

const Main = ({ children }: Props): JSX.Element => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Navbar />
      </AppBar>
      <main>{children}</main>
      <ProgressDrawer />
    </Box>
  );
};

export default Main;
