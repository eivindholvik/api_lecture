const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.API_PORT || 3000;
const projectsRouter = require("./routes/project");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

app.get("/", (req, res) => {
  res.json({ message: "ok"})
});

app.use("/projects", projectsRouter);

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});

