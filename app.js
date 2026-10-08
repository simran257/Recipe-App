const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const client = new MongoClient("mongodb://127.0.0.1:27017");

let db;

async function startServer() {
  try {
    // Connect to MongoDB
    await client.connect();

    db = client.db("recipeDB");

    console.log("MongoDB Connected ✔");

    // Home route
    app.get("/", (req, res) => {
      res.json({
        message: "Recipe API is running successfully"
      });
    });

    // GET - Get all recipes
    app.get("/recipes", async (req, res) => {
      try {
        const recipes = await db
          .collection("recipes")
          .find()
          .toArray();

        res.status(200).json(recipes);
      } catch (error) {
        res.status(500).json({
          error: "Failed to fetch recipes",
          message: error.message
        });
      }
    });

    // GET - Get single recipe by ID
    app.get("/recipes/:id", async (req, res) => {
      try {
        const recipe = await db.collection("recipes").findOne({
          _id: new ObjectId(req.params.id)
        });

        if (!recipe) {
          return res.status(404).json({
            error: "Recipe not found"
          });
        }

        res.status(200).json(recipe);
      } catch (error) {
        res.status(400).json({
          error: "Invalid recipe ID"
        });
      }
    });

    // POST - Add a new recipe
    app.post("/recipes", async (req, res) => {
      try {
        const { title, ingredients, instructions } = req.body;

        // Validate fields
        if (!title || !ingredients || !instructions) {
          return res.status(400).json({
            error: "All fields are required"
          });
        }

        const newRecipe = {
          title,
          ingredients,
          instructions
        };

        const result = await db
          .collection("recipes")
          .insertOne(newRecipe);

        res.status(201).json({
          message: "Recipe added successfully",
          recipeId: result.insertedId,
          recipe: newRecipe
        });
      } catch (error) {
        res.status(500).json({
          error: "Failed to add recipe",
          message: error.message
        });
      }
    });

    // PUT - Update a recipe
    app.put("/recipes/:id", async (req, res) => {
      try {
        const { title, ingredients, instructions } = req.body;

        if (!title || !ingredients || !instructions) {
          return res.status(400).json({
            error: "All fields are required"
          });
        }

        const result = await db.collection("recipes").updateOne(
          {
            _id: new ObjectId(req.params.id)
          },
          {
            $set: {
              title,
              ingredients,
              instructions
            }
          }
        );

        if (result.matchedCount === 0) {
          return res.status(404).json({
            error: "Recipe not found"
          });
        }

        res.status(200).json({
          message: "Recipe updated successfully"
        });
      } catch (error) {
        res.status(400).json({
          error: "Invalid recipe ID",
          message: error.message
        });
      }
    });

    // DELETE - Delete a recipe
    app.delete("/recipes/:id", async (req, res) => {
      try {
        const result = await db.collection("recipes").deleteOne({
          _id: new ObjectId(req.params.id)
        });

        if (result.deletedCount === 0) {
          return res.status(404).json({
            error: "Recipe not found"
          });
        }

        res.status(200).json({
          message: "Recipe deleted successfully"
        });
      } catch (error) {
        res.status(400).json({
          error: "Invalid recipe ID",
          message: error.message
        });
      }
    });

    // Start server
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });

  } catch (error) {
    console.error("Server startup error:", error);
  }
}

// Start application
startServer();
