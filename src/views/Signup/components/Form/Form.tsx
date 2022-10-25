/* eslint-disable react/no-unescaped-entities */
import React, { Dispatch, SetStateAction } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import AdbIcon from "@mui/icons-material/Adb";
import { User, UserSignIn, UserSignUp } from "../../../../api/users";

const validationSchema = yup.object({
  first_name: yup
    .string()
    .trim()
    .min(2, "Please enter a valid name")
    .max(50, "Please enter a valid name")
    .required("Please specify your first name"),
  last_name: yup
    .string()
    .trim()
    .min(2, "Please enter a valid name")
    .max(50, "Please enter a valid name")
    .required("Please specify your last name"),
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
  onSignup: (form: UserSignUp) => any;
  setUserDetails: Dispatch<SetStateAction<User>>;
}

const Form = ({ onSignup, setUserDetails }: Props): JSX.Element => {
  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  };

  const onSubmit = async (values: UserSignUp) => {
    console.log("values submitted", values);
    try {
      const response = await onSignup(values);
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
          Create an account
        </Typography>
        <Typography color="text.secondary">
          Fill out the form to get started.
        </Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography variant={"subtitle2"} sx={{ marginBottom: 2 }}>
              Enter your first name
            </Typography>
            <TextField
              label="First name *"
              variant="outlined"
              name={"first_name"}
              fullWidth
              value={formik.values.first_name}
              onChange={formik.handleChange}
              error={
                formik.touched.first_name && Boolean(formik.errors.first_name)
              }
              helperText={formik.touched.first_name && formik.errors.first_name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant={"subtitle2"} sx={{ marginBottom: 2 }}>
              Enter your last name
            </Typography>
            <TextField
              label="Last name *"
              variant="outlined"
              name={"last_name"}
              fullWidth
              value={formik.values.last_name}
              onChange={formik.handleChange}
              error={
                formik.touched.last_name && Boolean(formik.errors.last_name)
              }
              helperText={formik.touched.last_name && formik.errors.last_name}
            />
          </Grid>
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
            <Typography variant={"subtitle2"} sx={{ marginBottom: 2 }}>
              Enter your password
            </Typography>
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
                  Already have an account?{" "}
                  <Link
                    component={"a"}
                    color={"primary"}
                    href={"/signin"}
                    underline={"none"}
                  >
                    Login.
                  </Link>
                </Typography>
              </Box>
              <Button size={"large"} variant={"contained"} type={"submit"}>
                Sign up
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Form;
