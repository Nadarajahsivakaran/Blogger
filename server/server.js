import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import user from "./Route/user.js";
import post from "./Route/post.js";

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

app.use("/user", user);
app.use("/post", post);

app.listen(port, () =>
  console.log(`App is running at http://localhost:${port}`)
);
