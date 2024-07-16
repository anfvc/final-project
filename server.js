import express from "express";
import "express-async-errors";
import authRouter from "./routes/authRouter.js";
import connection from "./libs/database.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import productRouter from "./routes/productRouter.js";
import cartRouter from "./routes/cartRouter.js"
import wishListRouter from './routes/wishListRouter.js'

await connection();

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter)
app.use("/images", express.static("uploads"));
app.use("/api/wishlist", wishListRouter)

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

const port = process.env.PORT || 5100;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(errorHandlerMiddleware);
