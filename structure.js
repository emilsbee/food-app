const {

    // Recipes
    categoryRecipes: {
        recipeCategory: {
            recipeName: recipeid
        }
    },
    recipeCategories: {
        recipeid: {
            recipeCategory: True
        }
    },
    recipeCategoryNames: {
        recipeCategory: True
    },
    recipeNames: {
        recipeid: {
            link: recipeLink,
            recipeName: recipeName
        }
    },
    recipes: {
        recipeid: {
            category: recipeCategory,
            ingredients: {
                ingredient: True
            },
            link: recipeLink,
            name: recipeName
        }
    },

    // Groceries
    groceries: {
        groceryName: groceryCategory
    },
    groceryCategories: {
        groceryCategory: {
            groceryName: True
        }
    },
    groceryCategoryNames: {
        groceryCategory: True
    },

    // Weeks
    weeks: {
        weekid: {
            groceries: {
                groceryid: {
                    amount: amount, 
                    product: groceryName
                }
            },
            recipes: {
                Monday: {
                    recipeName: recipeName,
                    recipeid: recipeid
                }
            },
            total,
            year,
            weekNr,
            year_weekNr 
        }
    },
    yearWeekNumbers: {
        year_weekNr: weekid
    },
    yearWeeks: {
        year: {
            weekNr: weekid
        }
    },
    years: {
        year: True
    }
}