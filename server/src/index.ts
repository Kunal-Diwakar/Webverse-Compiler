import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";
import { dbConnect } from "./lib/dbConnect";
import { userRouter } from "./routes/userRoutes";
import { compilerRouter } from "./routes/compilerRoutes";
import cookieParser from "cookie-parser"
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    origin: ["http://localhost:5173", process.env.CLIENT_URL!],
  })
);

app.use("/compiler", compilerRouter);
app.use("/user", userRouter);

dbConnect();
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

