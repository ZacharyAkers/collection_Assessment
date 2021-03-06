const express         = require("express");
const bodyParser      = require("body-parser");
const validator       = require("express-validator");
const mustacheExpress = require("mustache-express");
const path            = require("path");
const routes          = require("./routes/route.js");

const app = express();

app.set('port', (process.env.PORT || 3000));

app.use(express.static(path.join(__dirname, "public")));

app.engine("mustache", mustacheExpress());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "mustache");
app.set("layout", "layout");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(validator());

app.use(routes);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});