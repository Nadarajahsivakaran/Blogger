import { useState, useEffect } from "react";
import {
  Button,
  CssBaseline,
  Grid,
  Box,
  Typography,
  Card,
} from "@mui/material";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import * as React from "react";
import { toast } from "react-toastify";

export default function AddPost({ getDatas, editData }) {
  const userID = localStorage.getItem("user");

  const initialForm = {
    id: "",
    title: "",
    comment: "",
    user_id: userID,
  };

  const [form, setForm] = useState(initialForm);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editData.id === undefined) {
      createPost();
    } else {
      updatePost();
    }
  };

  async function createPost() {
    const res = await fetch("http://localhost:4000/post/createPost", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const created_post = await res.json();

    if (created_post.message === "Post Saved Successfully") {
      toast.success("Post Saved Successfully");
    }
    setForm(initialForm);
    getDatas();
  }

  async function updatePost() {
    const res = await fetch(
      `http://localhost:4000/post/updatePost/${editData.id}`,
      {
        method: "put",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );
    const updated_post = await res.json();

    if (updated_post.message === "Successfully Updated") {
      toast.success("Successfully Updated");
    }
    setForm(initialForm);
    getDatas();
  }

  const { title, comment } = form;

  useEffect(() => {
    if (editData.id !== undefined) {
      setForm(editData);
    }
  }, [editData]);

  return (
    <>
      <Card sx={{ minWidth: 275, padding: 2 }}>
        <CssBaseline />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6">Add New Post</Typography>
          <br></br>
          <ValidatorForm
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container>
              <Grid item xs={12} sm={2}>
                <TextValidator
                  autoComplete="given-name"
                  name="title"
                  required
                  fullWidth
                  id="title"
                  label="Title..."
                  onChange={handleChange}
                  value={title}
                  validators={["required"]}
                  errorMessages={["Title is required"]}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={7}>
                <TextValidator
                  id="outlined-multiline-static"
                  label="Comments..."
                  multiline
                  required
                  name="comment"
                  rows={2}
                  value={comment}
                  onChange={handleChange}
                  validators={["required"]}
                  errorMessages={["Comment is required"]}
                  sx={{ marginLeft: 10, width: 400 }}
                />
              </Grid>

              <Grid item xs={12} sm={2}>
                {editData.id === undefined ? (
                  <Button
                    color="success"
                    onCanPlay={handleSubmit}
                    type="submit"
                    variant="contained"
                    sx={{ marginLeft: -30 }}
                  >
                    POST
                  </Button>
                ) : (
                  <Button
                    color="success"
                    onCanPlay={handleSubmit}
                    type="submit"
                    variant="contained"
                    sx={{ marginLeft: -30 }}
                  >
                    UPDATE
                  </Button>
                )}
              </Grid>
            </Grid>
          </ValidatorForm>
        </Box>
      </Card>
    </>
  );
}
