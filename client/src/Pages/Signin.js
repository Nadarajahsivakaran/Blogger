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
import { toast } from "react-toastify";

export default function Signin() {
  const navigate = useNavigate();
  const initialForm = {
    email: "",
    password: "",
  };
  const [form, setForm] = useState(initialForm);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await fetch("http://localhost:4000/user/login", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const login_user = await res.json();

    if (login_user.message === "User Loggedin Successfully") {
      localStorage.setItem("user", login_user.user);
      navigate("/home");
      toast.success("User Loggedin Successfully");
    }

    if (login_user.message === "Email or Password Invalid!") {
      toast.warning("Email or Password Invalid!");
    }
  };

  const { email, password } = form;

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
          Sign in
        </Typography>
        <ValidatorForm
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
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
            Sign in
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <RouterLink to="/signup">
                <Link component="span" variant="body2">
                  You don't have an account? Sign up
                </Link>
              </RouterLink>
            </Grid>
          </Grid>
        </ValidatorForm>
      </Box>
    </Container>
  );
}
