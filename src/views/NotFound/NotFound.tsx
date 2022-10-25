import React from "react";

import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Container } from "../../components";

const NotFound = (): JSX.Element => {
  const isMd = true;
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
          <Box>
            <Typography
              variant="h1"
              component={"h1"}
              justifyContent={"center"}
              align={"left"}
              sx={{ fontWeight: 700 }}
            >
              404
            </Typography>
            <Typography
              variant="h6"
              component="p"
              color="text.secondary"
              justifyContent={"center"}
              align={"left"}
            >
              Oops! Looks like you followed a bad link.
              <br />
              If you think this is a problem with us, please tell us!
            </Typography>
            <Box
              marginTop={4}
              display={"flex"}
              justifyContent={{ xs: "center", md: "flex-start" }}
            >
              <Button
                component={Link}
                variant="contained"
                color="primary"
                size="large"
                href={"/"}
              >
                Back home
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NotFound;
