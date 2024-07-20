require("dotenv").config();
const express = require("express");
const dataBase = require("./config/mongooseConnection");
const app = express();
const path = require("path");
const secretKey = process.env.SECRETKEY;
const userRoute = require("./routes/userRouter");
const productRoute = require("./routes/productRoute");
const ownerRoute = require("./routes/ownerRoute");
const cartRoutes = require("./routes/cartRoutes");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "mysupersecretkey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

app.use(cookieParser());
app.use("/products", productRoute);
app.use("/owner", ownerRoute);
app.use("/user", userRoute);
app.use("/", cartRoutes);

// error handling middleware
app.use((err, req, res, next) => {
  console.log("error--middlerware hit");
  console.log(err);
  const { status = 500, message = "some thing went wrong" } = err;
  res.status(status).json({ error: message });
});

app.listen(3000, () => {
  console.log("server is listing to port 3000");
});
