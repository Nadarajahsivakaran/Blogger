import React from "react";
import {
  Avatar,
  Button,
  Grid,
  Typography,
  ListItem,
  List,
  Divider,
  ListItemText,
  ListItemAvatar,
} from "@mui/material";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";

const Post = ({ data, getDatas, seteditData }) => {
  const userID = localStorage.getItem("user");

  function handleDelete(delete_id) {
    confirmAlert({
      title: "Confirm to Delete",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const res = await fetch(
              `http://localhost:4000/post/deletePost/${delete_id}`,
              {
                method: "DELETE",
                headers: {
                  "content-type": "application/json",
                },
              }
            );
            const delete_post = await res.json();

            if (delete_post.message === "Successfully Deleted") {
              toast.success("Successfully Deleted");
            }
            getDatas();
          },
        },
        {
          label: "No",
          onClick: () =>{

          },
        },
      ],
    });
    
  }

  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        marginTop: 2,
      }}
    >
      {data.map((value, index) => {
        return (
          <>
            <ListItem alignItems="flex-start" key={index}>
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>

              <ListItemText
                primary={value.first_name}
                secondary={
                  <React.Fragment>
                    <Grid sx={{ width: "90%" }}>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {value.title}
                      </Typography>
                      - {value.comment}
                    </Grid>
                  </React.Fragment>
                }
              />

              {Number(userID) === Number(value.user_id) ? (
                <>
                  <Button
                    type="submit"
                    variant="contained"
                    onClick={() => seteditData(value)}
                    sx={{ width: "5%", marginRight: 2, maxWidth: 2 }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(value.id)}
                    type="submit"
                    color="error"
                    variant="contained"
                    sx={{ width: "5%" }}
                  >
                    Delete
                  </Button>
                </>
              ) : (
                <></>
              )}
            </ListItem>
            <Divider variant="inset" component="li" />
          </>
        );
      })}
    </List>
  );
};

export default Post;
