import React from "react";

import { Container } from "./../../components";
import Main from "../../layouts/Main";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Form from "./components/Form";

const Signin = (): JSX.Element => {
  return (
    <Container>
      <Grid container alignItems={"center"} justifyContent={"center"}>
        <Grid
          item
          container
          alignItems={"center"}
          justifyContent={"center"}
          xs={12}
          md={6}
        >
          <Form />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Signin;
