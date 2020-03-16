const express = require("express");
const path = require("path");
const expressHandlebars = require("express-handlebars");
const logger = require("./middleware/logger");
const users = require("./Users");

const app = express();

// Initialize Middleware
app.use(logger);

// Handlebars Middleware
app.engine("handlebars", expressHandlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Body Parser Middlewaare
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Homepage Route
app.get("/", (request, response) => response.render("index", {
    title: "User App",
    users
}));

// Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Users API Routes
app.use("/api/users", require("./routes/api/users"));

const PORT = process.env.PORT || 8828;
app.listen(PORT, () => console.log(`Server Started AT PORT ${PORT}`));