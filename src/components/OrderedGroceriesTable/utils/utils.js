export const formatData = ({
    sortedGroceries
}) => {
    var categoryArr = []
    var usedCategories = []
    sortedGroceries.forEach((grocery) => {
        if (usedCategories.includes(grocery.category)) {
            var categoryIndex = usedCategories.indexOf(grocery.category)
            
            var groceryid = Object.keys(grocery).filter(title => title !== 'category' && title ||'categoryid')[0]
            var groceryObj = {}
            groceryObj[groceryid] = grocery[groceryid]
            
           categoryArr[categoryIndex].groceries.push(groceryObj)
        } else {
            var groceryid = Object.keys(grocery).filter(title => title !== 'category' && title ||'categoryid')[0]
            var groceryObj = {}
            groceryObj[groceryid] = grocery[groceryid]
            
            var formattedObj = {
                category: grocery.category,
                categoryid: grocery.categoryid,
                groceries: [
                    groceryObj
                ]
            }

            categoryArr.push(formattedObj)
            usedCategories.push(grocery.category)
        }
    })

    return categoryArr    
}

