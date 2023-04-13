import express from "express";
import cors from "cors";
import { v1Router } from './routes/v1';


const app = express();

const origin = {
  // origin: isProduction ? 'https://dddforum.com' : '*',
  origin: "*"
}

app.use(express.json({limit: '5mb'}));
app.use(cors(origin));

app.use("/api/v1", v1Router)


app.listen(3000, () => {
  console.log(`[App] Server listening on port http://localhost:3000`)
})
