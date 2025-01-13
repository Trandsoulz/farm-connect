import { NODE_ENV, PORT } from "./src/config/envConfig.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./src/config/dbConfig.js";
import userRoute from "./src/routes/user.route.js";
import User from "./src/models/user.model.js";

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

if (NODE_ENV === "dev") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("common"));
}

app.get("/", (req, res, next) => {
  res.status(200).send({
    status: "success",
    message: "Farm connect API is functional",
  });
});

// All routes should be defined here
app.use("/api/v1/auth", userRoute);

app.all("*", (req, res, next) => {
  res.status(404).send({
    status: "fail",
    message: `Can't ${req.method} ${req.originalUrl}`,
  });
});

app.listen(PORT, () => {
  console.log(
    `Server listening on PORT: ${PORT} at "http://localhost:${PORT}"`
  );
});
