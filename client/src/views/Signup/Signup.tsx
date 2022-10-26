import React, { useContext } from "react";
import Grid from "@mui/material/Grid";
import useAuth from "../../hooks/useAuth/useAuth";
import { UserDispatchContext } from "../../context/UserContext";

import { Container } from "./../../components";
import Form from "./components/Form";

const Signup = (): JSX.Element => {
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
          <Form setUserDetails={setUserDetails} onSignup={mutations.signup} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Signup;
