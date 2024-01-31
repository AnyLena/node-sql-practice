import 'dotenv/config'
import express from 'express';
import userRouter from "./routes/userRoutes.js";
import orderRouter from './routes/orderRoutes.js';
// import {query, validationResult, matchedData} from 'express-validator'


const app = express();
const port = 8000;

app.use(express.json())
app.use("/users", userRouter);
app.use("/orders", orderRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.get('/hello', query('person').notEmpty().escape(), (req, res) => {
//   const result = validationResult(req);
//   if (result.isEmpty()) {
//     const data = matchedData(req);
//     return res.send(`Hello, ${data.person}!`);
//   }
//   res.send({ errors: result.array() });
// });

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
