import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/joke", async (req, res) => {
  try {
    const choice = req.body.category;
    const response = await axios.get(
      `https://v2.jokeapi.dev/joke/${choice}?type=twopart`
    );
    const result = response.data;
    res.render("index.ejs", { setup: result.setup, delivery: result.delivery });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
