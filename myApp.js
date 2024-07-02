require('dotenv').config();
const bodyParser = require('body-parser');
let express = require('express');
let app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const method = req.method;
  const path = req.path;
  const ip = req.ip;
  console.log(`${method} ${path} - ${ip} `);

  next();
});

app.get("/", (req, res) => {
  // res.send("Hello Express")
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/json", (req, res) => {
  const style = process.env.MESSAGE_STYLE;
  const message = "Hello json";
  return style === "uppercase" ?
    res.json({ "message": message.toUpperCase() })
    :
    res.json({ "message": message });

});

app.get("/now", (req, res, next) => {
  const now = new Date().toString();
  req.time = now;
  next();
}, (req, res) => {
  res.json({ "time": req.time });
});

app.get('/:word/echo', (req, res, next) => {
  const word = req.params.word;
  res.json({ "echo": word });
  next();
});

app.route("/name").get((req, res) => {
  const firstName = req.query.first;
  const lastName = req.query.last;
  res.json({ "name": `${firstName} ${lastName}` });
}).post((req, res) => {
  const first = req.body.first;
  const last = req.body.last;

  res.json({ "name": `${first} ${last}` });
});

app.use("/public", express.static(__dirname + '/public'));




































module.exports = app;
