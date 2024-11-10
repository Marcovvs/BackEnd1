const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");
const viewRoutes = require("./routes/viewRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use("/", viewRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

app.listen(3030, () => {
  console.log("Servidor corriendo en http://localhost:3030");
});
