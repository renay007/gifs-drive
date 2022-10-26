import React, { useContext } from "react";

import { Container } from "./../../components";
import Grid from "@mui/material/Grid";
import Form from "./components/Form";
import useAuth from "../../hooks/useAuth/useAuth";
import { UserDispatchContext } from "../../context/UserContext";

const Signin = (): JSX.Element => {
  const setUserDetails = useContext(UserDispatchContext);
  const { mutations } = useAuth();
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
          <Form setUserDetails={setUserDetails} onSignin={mutations.signin} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Signin;
