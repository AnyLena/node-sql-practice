import 'dotenv/config'
import express from 'express';
import userRouter from "./routes/userRoutes.js";
import orderRouter from './routes/orderRoutes.js';

const app = express();
const port = 8000;

app.use(express.json())
app.use("/users", userRouter);
app.use("/orders", orderRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
