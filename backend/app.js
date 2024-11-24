const express = require("express");
const app = express();
const cors = require("cors")
require("dotenv").config();
require("./conn/conn");
const User = require("./routes/user");
const Books = require("./routes/book");
const Favourite = require("./routes/favourite");
const Cart = require("./routes/cart");
const Order = require("./routes/order")
app.use(cors());
app.use(express.json());
// routes
app.use("/api", User)
app.use("/api", Books)
app.use("/api", Favourite);
app.use("/api", Cart);
app.use("/api", Order);


// creating PORT
app.listen(process.env.PORT, () => {
    console.log(` Server is running on port ${process.env.PORT} `);
})
