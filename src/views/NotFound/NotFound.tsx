import React from "react";
import { Typography } from "@mui/material";

import { Container } from "./../../components";

const NotFound = (): JSX.Element => {
  return (
    <Container>
      <Typography>{"Page Not Found!"}</Typography>
    </Container>
  );
};

export default NotFound;
