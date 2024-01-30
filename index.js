import express from "express";
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = 8000;

app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
