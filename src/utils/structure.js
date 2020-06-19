import uniqid from 'uniqid'

export const weekStructure = () => {
    var weekObj = {}
    weekObj['recipes'] = {
        Monday: {
            recipeName: "",
            recipeid: ""
        },
        Tuesday: {
            recipeName: "",
            recipeid: ""
        },
        Wednesday: {
            recipeName: "",
            recipeid: ""
        },
        Thursday: {
            recipeName: "",
            recipeid: ""
        },
        Friday: {
            recipeName: "",
            recipeid: ""
        },
        Saturday: {
            recipeName: "",
            recipeid: ""
        },
        Sunday: {
            recipeName: "",
            recipeid: ""
        },
    }

    weekObj['total'] = 0
    
    var allGroceryObj = {}

    const arr10 = [0,1,2,3,4,5,6,7,8,9]
    arr10.forEach((element) => {
        allGroceryObj[uniqid()] = {amount: '', product: ''}
    })

    weekObj['groceries'] = allGroceryObj
    
    return weekObj
}

export const initRecipeCategoryNames = [
    "Rice",
    "Soups",
    "Burgers and wraps",
    "Chinese", 
    "Indian", 
    "Mexican", 
    "Desserts",
    "Salads",
    "Potatoes" 
]

export const initGroceryCategoryNames = [
    "Beverages", 
    "Bakery",
    "Canned", 
    "Dairy", 
    "Baking goods",
    "Frozen",
    "Meat", 
    "Produce"
]

