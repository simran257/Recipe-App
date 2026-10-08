const API_URL = "http://localhost:3000/recipes";
const recipeForm = document.getElementById("recipeForm");
const titleInput = document.getElementById("title");
const ingredientsInput = document.getElementById("ingredients");
const instructionsInput = document.getElementById("instructions");
const recipesContainer = document.getElementById("recipes");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");
const formHeading = document.getElementById("formHeading");
const message = document.getElementById("message");
const searchInput = document.getElementById("searchInput");
const loading = document.getElementById("loading");
const recipeCount = document.getElementById("recipeCount");

let recipes = [];
let editingId = null;

/* =========================
   GET ALL RECIPES
========================= */

async function getRecipes() {
try {
loading.style.display = "block";
const response = await fetch(API_URL);
if (!response.ok) {
throw new Error("Failed to fetch recipes");
}
recipes = await response.json();
displayRecipes(recipes);
} catch (error) {
console.error(error);
recipesContainer.innerHTML ="<p>Unable to load recipes. Please check the server.</p>";
} finally {
loading.style.display = "none";
}
}

/* =========================
   DISPLAY RECIPES
========================= */

function displayRecipes(data) {
recipesContainer.innerHTML = "";
recipeCount.textContent =`${data.length} recipe${data.length !== 1 ? "s" : ""} found`;
if (data.length === 0) {
recipesContainer.innerHTML = `<p style="text-align:center;">No recipes found.</p>`;
return;
}
data.forEach(recipe => {
const recipeDiv = document.createElement("div");
recipeDiv.className = "recipe";
recipeDiv.innerHTML = `
<h3>🍽️ ${escapeHTML(recipe.title)}</h3>
<h4>Ingredients</h4>
<p>${escapeHTML(recipe.ingredients)}</p>
<h4>Instructions</h4>
<p>${escapeHTML(recipe.instructions)}</p>
<div class="recipe-buttons">
<button class="edit-btn" onclick="editRecipe('${recipe._id}')">✏️ Edit </button>
<button class="delete-btn" onclick="deleteRecipe('${recipe._id}')">🗑️ Delete </button>
</div>`;
recipesContainer.appendChild(recipeDiv);
});
}

/* =========================
   ADD / UPDATE RECIPE
========================= */

recipeForm.addEventListener("submit", async function (event) {
event.preventDefault();
const title = titleInput.value.trim();
const ingredients = ingredientsInput.value.trim();
const instructions = instructionsInput.value.trim();
if (!title || !ingredients || !instructions) {
showMessage("Please fill all fields.","red");
return;
}
const recipeData = {
title,
ingredients,
instructions
};
try {
let response;

/* UPDATE */
if (editingId) {
response = await fetch(`${API_URL}/${editingId}`,{
method: "PUT"
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify(recipeData)
}
);
}

/* ADD */
else {
response = await fetch(
API_URL,
{
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify(recipeData)
}
);
}
const result = await response.json();
if (!response.ok) {
throw new Error(
result.error || "Something went wrong"
);
}
if (editingId) {
showMessage("Recipe updated successfully! ✔","green");
} else {
showMessage("Recipe added successfully! ✔","green");
}
resetForm();
getRecipes();
} catch (error) {
console.error(error);
showMessage(error.message,"red");
}
});

/* =========================
   EDIT RECIPE
========================= */

function editRecipe(id) {
const recipe = recipes.find(item => item._id === id);
if (!recipe) {
return;
}
titleInput.value = recipe.title;
ingredientsInput.value = recipe.ingredients;
instructionsInput.value = recipe.instructions;
editingId = id;
formHeading.textContent = "Edit Recipe";
submitBtn.textContent = "Update Recipe";
cancelBtn.style.display = "inline-block";
window.scrollTo({
top: 0,
behavior: "smooth"
});
}

/* =========================
   DELETE RECIPE
========================= */

async function deleteRecipe(id) {
const confirmDelete =
confirm("Are you sure you want to delete this recipe?");
if (!confirmDelete) {
return;
}
try {
const response = await fetch(`${API_URL}/${id}`,
{
method: "DELETE"
}
);
const result = await response.json();
if (!response.ok) {
throw new Error(result.error || "Delete failed");
}
showMessage("Recipe deleted successfully! ✔","green");
getRecipes();
} catch (error) {
console.error(error);
showMessage(
error.message,"red");
}
}

/* =========================
   CANCEL EDIT
========================= */

cancelBtn.addEventListener(
"click",
function () {
resetForm();
}
);

/* =========================
   RESET FORM
========================= */

function resetForm() {
recipeForm.reset();
editingId = null;
formHeading.textContent =
"Add New Recipe";
submitBtn.textContent = "Add Recipe";
cancelBtn.style.display =
"none";
}

/* =========================
   SEARCH RECIPES
========================= */

searchInput.addEventListener(
"input",
function () {
const searchText = searchInput.value.toLowerCase().trim();
const filteredRecipes = recipes.filter(recipe =>
recipe.title.toLowerCase().includes(searchText)||
recipe.ingredients.toLowerCase().includes(searchText)||
recipe.instructions.toLowerCase().includes(searchText)
);
displayRecipes(filteredRecipes);
}
);

/* =========================
   MESSAGE
========================= */

function showMessage(text, color) {
message.textContent = text;
message.style.color = color;
setTimeout(() => {
message.textContent = "";
}, 3000);
}

/* =========================
   SECURITY HELPER
========================= */

function escapeHTML(text) {
const div = document.createElement("div");
div.textContent = text;
return div.innerHTML;
}

/* =========================
   INITIAL LOAD
========================= */

getRecipes();
