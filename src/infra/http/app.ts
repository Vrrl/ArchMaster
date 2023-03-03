import express from "express";
// import cors from "cors";
import { v1Router } from './routes/v1';


const app = express();

app.use(express.json({limit: '5mb'}));
// app.use(cors());

app.use("/api/v1", v1Router)


app.listen(3000, () => {
  console.log(`[App] Server listening on port http://localhost:3000`)
})
