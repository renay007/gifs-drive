/* eslint-disable react/no-unescaped-entities */
import React, { Dispatch, SetStateAction, useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import AdbIcon from "@mui/icons-material/Adb";
import { User, UserSignIn } from "../../../../api/users";

const validationSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Please enter a valid email address")
    .required("Email is required."),
  password: yup
    .string()
    .required("Please specify your password")
    .matches(
      new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
      ),
      "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
});

interface Props {
  onSignin: (form: UserSignIn) => any;
  setUserDetails: (value: any) => SetStateAction<void>;
}

const Form = ({ onSignin, setUserDetails }: Props): JSX.Element => {
  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values: UserSignIn) => {
    console.log("values submitted", values);
    try {
      const response = await onSignin(values);
      console.log("user", response.data);
      setUserDetails(response.data);
    } catch (error) {
      console.log("Failed to sign in");
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });

  return (
    <Box>
      <Box marginBottom={4}>
        <AdbIcon fontSize="large" />
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
          }}
        >
          Login
        </Typography>
        <Typography color="text.secondary">
          Login to manage your GIF drive.
        </Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant={"subtitle2"} sx={{ marginBottom: 2 }}>
              Enter your email
            </Typography>
            <TextField
              label="Email *"
              variant="outlined"
              name={"email"}
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <Box
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              alignItems={{ xs: "stretched", sm: "center" }}
              justifyContent={"space-between"}
              width={1}
              marginBottom={2}
            >
              <Box marginBottom={{ xs: 1, sm: 0 }}>
                <Typography variant={"subtitle2"}>
                  Enter your password
                </Typography>
              </Box>
            </Box>
            <TextField
              label="Password *"
              variant="outlined"
              name={"password"}
              type={"password"}
              fullWidth
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid item container xs={12}>
            <Box
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              alignItems={{ xs: "stretched", sm: "center" }}
              justifyContent={"space-between"}
              width={1}
              maxWidth={600}
              margin={"0 auto"}
            >
              <Box marginBottom={{ xs: 1, sm: 0 }}>
                <Typography variant={"subtitle2"}>
                  Don't have an account yet?{" "}
                  <Link
                    component={"a"}
                    color={"primary"}
                    href={"/signup"}
                    underline={"none"}
                  >
                    Sign up here.
                  </Link>
                </Typography>
              </Box>
              <Button size={"large"} variant={"contained"} type={"submit"}>
                Login
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Form;
