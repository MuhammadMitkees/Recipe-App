"use strict";
let getsavedRecipes = () => {
  let recipesJSON = localStorage.getItem("recipes");

  try {
    return recipesJSON ? JSON.parse(recipesJSON) : [];
  } catch (e) {
    return [];
  }
};
let recipes = getsavedRecipes();
let renderCards = (recipes, filters) => {
  let filteredCards = recipes.filter((card) =>
    card.title.toLowerCase().includes(filters.searchText.toLowerCase())
  );
  document.querySelector("#cardsDiv").innerHTML = "";
  filteredCards.forEach((recipe) => {
    let cardEl = generateCardsDom(recipe);
    document.querySelector("#cardsDiv").appendChild(cardEl);
  });
};
let generateRecipeSummary = (recipe) => {
  let completedIngredientsList = recipe.ingredients.filter((ing) => {
    return ing.completed;
  });
  return `You have got ${completedIngredientsList.length} ingredients out of ${recipe.ingredients.length} ingredients`;
};

let generateCardsDom = (recipe) => {
  let cardEl = document.createElement("div");
  let cardTitle = document.createElement("p");
  let summaryText = document.createElement("p");
  // setip div class
  cardEl.setAttribute("class", "cardDiv");
  cardEl.addEventListener("click", (e) => {
    location.assign(`app-edit.html#${recipe.id}`);
  });
  // cardEl.setAttribute("id", `${id}`);
  // setup cards text
  cardTitle.textContent = recipe.title;
  cardEl.appendChild(cardTitle);

  summaryText.textContent = generateRecipeSummary(recipe);
  cardEl.appendChild(summaryText);
  // cardEl.onclick = (id) => {
  //   // location.assign(`/new-recipe/app-edit.html#${id}`);
  // };
  return cardEl;
};
let saveRecipe = () => {
  localStorage.setItem("recipes", JSON.stringify(recipes));
};
let generateIngDom = (ingredient) => {
  let IngEl = document.createElement("div");
  let ingCheck = document.createElement("input");
  let IngText = document.createElement("span");
  let deleteButton = document.createElement("button");
  // setup checkbox
  ingCheck.setAttribute("type", "checkbox");
  ingCheck.checked = ingredient.completed;
  IngEl.appendChild(ingCheck);
  ingCheck.addEventListener("change", () => {
    toggleIng(ingredient.id);
    saveRecipe(recipes);
  });
  // setup ing text
  IngText.textContent = ingredient.title;
  IngEl.appendChild(IngText);
  // setup remove button
  deleteButton.textContent = "remove";
  IngEl.appendChild(deleteButton);
  deleteButton.addEventListener("click", (e) => {
    removeIng(ingredient.id);
    renderIng();
    saveRecipe();
  });
  return IngEl;
};
let renderIng = () => {
  document.querySelector("#ingredients").innerHTML = "";
  recipe.ingredients.forEach((ing) => {
    document.querySelector("#ingredients").appendChild(generateIngDom(ing));
  });
};
let removeIng = (id) => {
  let removedIngIndex = recipe.ingredients.findIndex((ingredient) => {
    return ingredient.id === id;
  });
  recipe.ingredients.splice(removedIngIndex, 1);
};
let toggleIng = (id) => {
  let ing = recipe.ingredients.find((ing) => ing.id === id);
  if (ing) {
    ing.completed = !ing.completed;
  }
};
