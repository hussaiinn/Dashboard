const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3300;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://hussain62655:Hussain12@dashboard.v5gxxt9.mongodb.net/?retryWrites=true&w=majority&appName=Dashboard",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// Define a schema and model for your data
const dataSchema = new mongoose.Schema({
  end_year: String,
  intensity: Number,
  sector: String,
  topic: String,
  insight: String,
  url: String,
  region: String,
  start_year: String,
  impact: String,
  added: String,
  published: String,
  country: String,
  relevance: Number,
  pestle: String,
  source: String,
  title: String,
  likelihood: Number,
});

const Data = mongoose.model("Data", dataSchema, "myCollection");

// Define routes
app.get("/api/data", async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Define a POST route to handle form submissions
app.post("/api/data", async (req, res) => {
  const {
    end_year,
    intensity,
    sector,
    topic,
    insight,
    url,
    region,
    start_year,
    impact,
    added,
    published,
    country,
    relevance,
    pestle,
    source,
    title,
    likelihood,
  } = req.body;

  const newData = new Data({
    end_year,
    intensity,
    sector,
    topic,
    insight,
    url,
    region,
    start_year,
    impact,
    added,
    published,
    country,
    relevance,
    pestle,
    source,
    title,
    likelihood,
  });

  try {
    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
