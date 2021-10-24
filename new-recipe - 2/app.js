"use strict";
let filters = {
  searchText: "",
};

document.querySelector("#searchRecipe").addEventListener("input", (e) => {
  filters.searchText = e.target.value;
  renderCards(recipes, filters);
});
document.querySelector("#addRecipe").addEventListener("click", (e) => {
  let id = uuidv4();

  let recipe = {
    id,
    title: "",
    description: "",
    ingredients: [],
  };
  recipes.push(recipe);
  saveRecipe(recipes);
  location.assign(`app-edit.html#${id}`);
});
renderCards(recipes, filters);
