export const addIngredientToRecipe = ({
    localIngredients,
    ingredient,
    setIngredient,
    e,
    setLocalIngredients
}) => {
    e.preventDefault()
    if (!localIngredients.includes(ingredient) && ingredient.trim() !== '') {
        setLocalIngredients([...localIngredients, ingredient])
        setIngredient('')
        return
    } else {
        setIngredient('')
        return
    }
}

export const startUpdateRecipe = ({
    localName,
    localIngredients,
    localCategory,
    setError,
    onSubmit,
    localLink
}) => {
    if (localName === '' || !localIngredients || localCategory === '') {
        return setError(true)
    } 

    
    var ingredientObj = {}
    localIngredients.forEach((ingredient) => {
        ingredientObj[ingredient] = true
    })

    onSubmit({
            name: localName, 
            link: localLink,
            ingredients: ingredientObj,
            category: localCategory
    })
}

export const removeIngredient = ({
    ingredient,
    localIngredients,
    setLocalIngredients
}) => {
    
    var filteredAray = localIngredients.filter(ingred => ingred !== ingredient)

    setLocalIngredients(filteredAray)
    return
}