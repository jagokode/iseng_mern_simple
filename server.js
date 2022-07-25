import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import postRouter from "./routes/postRoute.js";
const port = 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect("mongodb://localhost:27017/simpleFullstack")
  .catch((err) => console.log(err));

app.use("/api/posts", postRouter);

app.listen(port, () => console.log(`Server is running on port ${port}`));
