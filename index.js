let express = require("express");
let app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/:qty", (req, res) => {
  const input = req.params.qty;
  console.log(input);
  res.send(input);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
