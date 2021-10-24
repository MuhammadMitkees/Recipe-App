"use strict";
let recipeId = location.hash.substring(1);
let recipe = recipes.find((recipe) => {
  return recipe.id === recipeId;
});
document.querySelector("#titleContent").textContent = recipe.title;
document.querySelector("#descriptionContent").textContent = recipe.description;
document.querySelector("#titleDescription").addEventListener("submit", (e) => {
  e.preventDefault();
  recipe.title = e.target.elements.title.value;
  recipe.description = e.target.elements.description.value;
  saveRecipe(recipes);
});
document.querySelector("#new-ingredient").addEventListener("submit", (e) => {
  e.preventDefault();
  let id = uuidv4();
  let ing = {
    id: id,
    title: e.target.elements.text.value,
    completed: false,
  };
  if (ing.title !== "") {
    recipe.ingredients.push(ing);
    renderIng();
    saveRecipe(recipes);
    e.target.elements.text.value = "";
  } else {
    alert("You must type something");
  }
});
renderIng();
document.querySelector("#deleteRecipe").addEventListener("click", (e) => {
  let recipeIndex = recipes.findIndex((recipe) => {
    return recipe.id === recipeId;
  });
  recipes.splice(recipeIndex, 1);
  saveRecipe(recipes);
  location.assign("app.html");
});
document.querySelector("#backButton").addEventListener("click", (e) => {
  location.assign(`app.html`);
});
