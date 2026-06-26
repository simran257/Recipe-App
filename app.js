const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const client = new MongoClient("mongodb://127.0.0.1:27017");

let db;

async function startServer() {
  await client.connect();
  db = client.db("recipeDB");

  console.log("MongoDB Connected ✔");

  
  app.get("/recipes", async (req, res) => {
    const recipes = await db.collection("recipes").find().toArray();
    res.json(recipes);
  });

  
  app.post("/recipes", async (req, res) => {
    const { title, ingredients, instructions } = req.body;

    if (!title || !ingredients || !instructions) {
      return res.status(400).json({ error: "All fields required" });
    }

    const result = await db.collection("recipes").insertOne({
      title,
      ingredients,
      instructions
    });

    res.status(201).json({ message: "Recipe added", result });
  });

  
  app.put("/recipes/:id", async (req, res) => {
    await db.collection("recipes").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );

    res.json({ message: "Updated" });
  });

  
  app.delete("/recipes/:id", async (req, res) => {
    await db.collection("recipes").deleteOne({
      _id: new ObjectId(req.params.id)
    });

    res.json({ message: "Deleted" });
  });

  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
}

startServer();