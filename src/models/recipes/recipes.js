// External imports
import { thunk, action } from "easy-peasy"


// Internal imports
import { recipeListOrder } from './utils'
import database from '../../components/firebase/firebase'
import { store } from '../../index'

const recipesModel = {
    currentRecipe: false,
    currentRecipeList: false,
    recipeCategories: false,
    recipes: false,
    recipeCategoryNames: false,
    startRecipeCategoryNamesListener: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid

        const recipeCategoryNamesRef = await database.ref(`users/${uid}/recipeCategoryNames`)
        recipeCategoryNamesRef.on('value', function (snapshot) {
            if (snapshot.val() !== null) {
                actions.setRecipeCategoryNames(snapshot.val())
            } 
            
        })
    }),
    stopRecipeCategoryNamesListener: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        await database.ref(`users/${uid}/recipeCategoryNames`).off()
        actions.setRecipeCategoryNames(false)
    }),
    setRecipeCategoryNames: action((state, payload) => {
        state.recipeCategoryNames = payload
    }),
    addRecipe: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        await database.ref(`users/${uid}/recipes`).push(payload).then((ref) => {
            console.log(ref)
        })
    }),
    setRecipes: action((state, payload) => {
        state.recipes = payload
    }),
    startRecipeNamesListener: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        var recipesArr = []

        const recipeNamesRef = await database.ref(`users/${uid}/recipeNames`)
        return recipeNamesRef.on('value', function(snapshot) {
            if (snapshot.val() !== null) {
                var recipesObj;
                
                Object.keys(snapshot.val()).forEach((key) => {
                    recipesObj = snapshot.val()[key]
                    recipesObj["recipeid"] = key
                    recipesArr.push(recipesObj)
                })
                actions.setRecipes(recipesArr)
            } else {
                actions.setRecipes([])
                return
            }
        })
        
        
    }),
    stopRecipeNamesListener: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        await database.ref(`users/${uid}/recipeNames`).off()
        actions.setRecipes(false)
    }),
    startRecipeListener: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        
        const recipeRef = await database.ref(`users/${uid}/recipes/${payload.recipeid}`)
        recipeRef.on('value', function(snapshot) {
            if (snapshot.val() !== null) {
                
                var recipeObj = snapshot.val()
                recipeObj["recipeid"] = snapshot.key
                actions.setCurrentRecipe(recipeObj)
            }
        })
    
    }),
    stopRecipeListener: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid

        await database.ref(`users/${uid}/recipes`).off()
        actions.setCurrentRecipe(false)
    }),

    // HERE
    startRecipeListListener: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid

        const recipeRef = await database.ref(`users/${uid}/recipes`).limitToFirst(15)
        recipeRef.on('value', function(snapshot) {
            if (snapshot.val() !== null) {
                const recipeArr = recipeListOrder(snapshot.val())
                actions.setRecipeList(recipeArr)
            } else {
                actions.setRecipeList([])
            }
        })
    }),

    stopRecipeListListener: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid

        await database.ref(`users/${uid}/recipes`).off()
        actions.setRecipeList(false)
    }),
    setRecipeList: action((state, payload) => {
        state.currentRecipeList = payload
    }),
    setCurrentRecipe: action((state, payload) => {
        state.currentRecipe = payload
    }),
    updateRecipe: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid

        var updates = {}

        
        switch (payload.type) {
            case 'FULL_UPDATE':
                var recipeCategoryObj = {}
                recipeCategoryObj[payload.recipeObj.category] = true
        
                var categoryRecipesObj = {}
                categoryRecipesObj[payload.recipeid] = payload.recipeObj.name
                
                updates[`users/${uid}/recipes/${payload.recipeid}`] = payload.recipeObj
                updates[`users/${uid}/recipeNames/${payload.recipeid}`] = payload.recipeNamesObj
                updates[`users/${uid}/recipeCategories/${payload.recipeid}`] = recipeCategoryObj
                updates[`users/${uid}/categoryRecipes/${payload.recipeObj.category}`] = categoryRecipesObj

                break;
            case 'RECIPE_DELETE':
                const recipe_delete_recipeCategoryName = await database.ref(`users/${uid}/recipeCategories/${payload.recipeid}`).once('value')
                updates[`users/${uid}/recipes/${payload.recipeid}`] = {}
                updates[`users/${uid}/recipeNames/${payload.recipeid}`] = {}
                updates[`users/${uid}/recipeCategories/${payload.recipeid}`] = {}
                
                Object.keys(recipe_delete_recipeCategoryName.val()).forEach((categoryid) => {
                    updates[`users/${uid}/categoryRecipes/${categoryid}/${payload.recipeid}`] = {}
                })
                break;
            case 'RECIPE_NAME':
                const recipe_name_recipeCategoryName = await database.ref(`users/${uid}/recipeCategories/${payload.recipeid}`).once('value')
                updates[`users/${uid}/recipes/${payload.recipeid}/name`] = payload.name
                updates[`users/${uid}/recipeNames/${payload.recipeid}/recipeName`] = payload.name
                Object.keys(recipe_name_recipeCategoryName.val()).forEach((categoryid) => {
                    updates[`users/${uid}/categoryRecipes/${categoryid}/${payload.recipeid}`] = payload.name
                })
                break;
            case 'RECIPE_LINK':
                updates[`users/${uid}/recipes/${payload.recipeid}/link`] = payload.link
                updates[`users/${uid}/recipeNames/${payload.recipeid}/link`] = payload.link
                break;
            case 'RECIPE_CATEGORY':
                
                const recipe_category_recipeCategories = await database.ref(`users/${uid}/recipes/${payload.recipeid}/category`).once('value')
                console.log(payload.categoryid,recipe_category_recipeCategories.val())
                if(payload.categoryid === recipe_category_recipeCategories.val()) {
                    return
                } else {
                    updates[`users/${uid}/categoryRecipes/${payload.categoryid}/${payload.recipeid}`] = {}
                    var recipe_category_recipeCategoryObj = {}
                    recipe_category_recipeCategoryObj[payload.categoryid] = true
                    updates[`users/${uid}/recipeCategories/${payload.recipeid}/${payload.recipeid}`] = recipe_category_recipeCategoryObj
                    updates[`users/${uid}/recipes/${payload.recipeid}/category`] = payload.categoryid
                }
                break;
            case 'RECIPE_INGREDIENTS':
                updates[`users/${uid}/recipes/${payload.recipeid}/ingredients`] = payload.ingredients
                break;
        }

        return database.ref().update(updates)
    }),
    newRecipe: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        const newRecipe = await database.ref(`users/${uid}/recipes`).push(payload.recipeObj)

        var recipeCategoryObj = {}
        recipeCategoryObj[payload.recipeObj.category] = true

        var categoryRecipesObj = {}
        categoryRecipesObj[newRecipe.key] = payload.recipeObj.name
        
        
        await database.ref(`users/${uid}/recipeNames/${newRecipe.key}`).set(payload.recipeNamesObj)
        await database.ref(`users/${uid}/recipeCategories/${newRecipe.key}`).set(recipeCategoryObj)
        return await database.ref(`users/${uid}/categoryRecipes/${payload.recipeObj.category}`).set(categoryRecipesObj)
    })
}


export default recipesModel