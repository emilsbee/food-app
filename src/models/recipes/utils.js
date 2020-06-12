export const recipeListOrder = (recipes) => {
    var recipeArr = []
    
    Object.keys(recipes).forEach((key) => {
        var recipeObj = recipes[key]
        recipeObj['recipeid'] = key
        recipeArr.push(recipeObj)
    })
    return recipeArr
}