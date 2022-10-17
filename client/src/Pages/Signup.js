import { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import * as React from "react";
import { toast } from "react-toastify";

export default function Sigup() {
  const navigate = useNavigate();
  const initialForm = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  };
  const [form, setForm] = useState(initialForm);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await fetch("http://localhost:4000/user/register", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const newUser = await res.json();

    if (newUser.message === "User Created Successfully") {
      navigate("/");
      toast.success("User Created Successfully");
    }

    if (newUser.message === "User Already exist!") {
      toast.warning("User Already exist!");
    }
  };

  const { first_name, last_name, email, password } = form;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <ValidatorForm
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextValidator
                autoComplete="given-name"
                name="first_name"
                required
                fullWidth
                id="firstName"
                label="First Name"
                onChange={handleChange}
                value={first_name}
                validators={["required"]}
                errorMessages={["First Name is required"]}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextValidator
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="last_name"
                autoComplete="family-name"
                onChange={handleChange}
                value={last_name}
                validators={["required"]}
                errorMessages={["Last Name is required"]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
                value={email}
                validators={["required", "isEmail"]}
                errorMessages={["Email is required", "Email is not valid"]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={handleChange}
                value={password}
                validators={["required"]}
                errorMessages={["Password is required"]}
              />
            </Grid>
          </Grid>
          <Button
            onCanPlay={handleSubmit}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <RouterLink to="/">
                <Link component="span" variant="body2">
                  Already have an account? Sign in
                </Link>
              </RouterLink>
            </Grid>
          </Grid>
        </ValidatorForm>
      </Box>
    </Container>
  );
}
