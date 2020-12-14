export const updateName = ({
    e,
    recipeid,
    name,
    updateRecipe,
    setError
}) => {
    e.preventDefault()
    if (name.trim() === '') {
        setError(true)
    } else {
        updateRecipe({
            type: 'RECIPE_NAME',
            recipeid,
            name
        })
    }
}

export const updateLink = ({
    e,
    recipeid,
    link,
    updateRecipe,
    setError
}) => {
    e.preventDefault()
    if (link.trim() === "") {
        return
    } else {
        updateRecipe({
            type: 'RECIPE_LINK',
            recipeid,
            link
        })
    }
}

export const updateCategory = ({
    e,
    recipeid,
    categoryid,
    updateRecipe
}) => {
    updateRecipe({
        type: 'RECIPE_CATEGORY',
        recipeid,
        categoryid
    })
}

export const addIngredientToRecipe = ({
    ingredients,
    ingredient,
    setIngredient,
    e,
    updateRecipe,
    recipeid
}) => {
    e.preventDefault()

    if (!ingredients.includes(ingredient) && ingredient.trim() !== '') {
        ingredients.push(ingredient)
        
        var ingredObj = {}
        ingredients.forEach((ingred) => {
            ingredObj[ingred] = true
        })

        updateRecipe({
            type: 'RECIPE_INGREDIENTS',
            recipeid,
            ingredients: ingredObj
        })

        setIngredient('')
        return
    } else {
        setIngredient('')
        return
    }
}

export const removeIngredient = ({
    ingredients,
    ingredient,
    updateRecipe,
    recipeid,
    setLocalIngredients
}) => {
    
    if (ingredients.length > 1) {
        
        var filteredArr = ingredients.filter(ingred => ingred !== ingredient)
        setLocalIngredients(filteredArr)
        var ingredObj = {}
        filteredArr.forEach((ingre) => {
            ingredObj[ingre] = true
        })
        updateRecipe({
            type: 'RECIPE_INGREDIENTS',
            recipeid,
            ingredients: ingredObj
        })
    }
}