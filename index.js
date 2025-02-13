const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user.js");
const authRoute = require("./routes/auth.js");
const aboutRoute = require("./routes/about.js");
const productRoute = require("./routes/product.js");
const cartRoute = require("./routes/cart.js");
const orderRoute = require("./routes/order.js");

dotenv.config();

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoute);
app.use("/api/about", aboutRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connection successfull."))
  .catch((err) => console.log(err));

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running.");
});
