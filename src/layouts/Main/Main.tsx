import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";

import { Navbar, ProgressDrawer } from "./components";
import useAuth from "../../hooks/useAuth/useAuth";

interface Props {
  children: React.ReactNode;
}

const Main = ({ children }: Props): JSX.Element => {
  const { mutations } = useAuth();
  return (
    <Box>
      <AppBar
        sx={{
          top: 0,
        }}
        position="sticky"
      >
        <Navbar onLogout={mutations.logout} />
      </AppBar>
      <Box marginBottom={6}>{children}</Box>
      <ProgressDrawer />
    </Box>
  );
};

export default Main;
