import * as React from "react";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";


export default function Header() {
  const userID = localStorage.getItem("user");
 

  const logout = ()=>{
    localStorage.clear();
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" className="text-white">
              {" "}
              Blogger
            </Link>
          </Typography>

          {userID ===null ? (
            <>
              <Link to="/" className="text-white">
                <Button color="inherit">Login</Button>
              </Link>

              <Link to="/signup" className="text-white">
                <Button color="inherit">Register</Button>
              </Link>
            </>
          ) : (
            <Link to="/" className="text-white">
              <Button color="inherit" onClick={logout}>Log out</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
