require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");
const express = require('express')
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express()
const expressLayouts = require('express-ejs-layouts');

let PORT = process.env.PORT || 8080

// Set up view engine
app.set("view engine", "ejs"); // or "pug", "hbs", etc.
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static(path.join(__dirname, "public"))); // For serving static files

//* extend body limit to 50MB
app.use(bodyParser.json({ limit: process.env.LimitbodyParser }))
app.use(bodyParser.urlencoded({ limit: process.env.LimitbodyParser, extended: true }))

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

// Use express-ejs-layouts
app.use(expressLayouts);

// Optional: Set layout extractScripts and extractStyles if needed
app.set('layout extractScripts', true);
app.set('layout extractStyles', true);

app.use("/", require("./routes/index"));

//* Connect to MONGODB Database -> listen on PORT
mongoose
    .connect(process.env.DATABASE_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((__, err) => {
        if (!err) {
            console.log("Connected to Database")
        } else {
            console.log(err)
        }
    })
    .finally(() => { })

app.listen(PORT, () => console.log(`listening on PORT ${PORT}!`))