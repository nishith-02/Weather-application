const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./Utils/geocode");
const forecast = require("./Utils/forecast");

const app = express();
const port=process.env.PORT || 3000

//Define Paths
const publicDirectoryPath = path.join(__dirname, "../public");
const viewspath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

//Setup Handlebars and view location
app.set("view engine", "hbs");
app.set("views", viewspath);
hbs.registerPartials(partialPath);

//Setup static dirctory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Nishith",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Nishith",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    message: "This is some helpful text",
    title: "Help",
    name: "Nishith",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "address must be provided",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error: error,
        });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error: error,
          });
        }
        res.send({
          location: location,
          forecast: forecastData,
          address: req.query.address,
        });
      });
    }
  );
});


app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404",
    message: "Help article not found",
    name: "Nishith",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    message: "Page not found",
    name: "Nishith",
  });
});
app.listen(port, () => {
  console.log("server is up on port" + port);
});
