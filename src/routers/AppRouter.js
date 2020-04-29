// External imports
import React from 'react'
import { createBrowserHistory } from 'history'
import {Router, Route, Switch} from 'react-router-dom'


// Internal imports
import MainDashboard from '../components/MainDashboard/MainDashboard'
import LoginPage from '../components/LoginPage/LoginPage'
import ManageRecipes from '../components/ManageRecipes/ManageRecipes'
import RecipeEdit from '../components/RecipeEdit/RecipeEdit'
import NotFound from '../components/NotFound/NotFound'
import RecipePicker from '../components/RecipePicker/RecipePicker'
import NewRecipe from '../components/NewRecipe/NewRecipe'
import OrderedGroceries from '../components/OrderedGroceries/OrderedGroceries'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'


export const history = createBrowserHistory()

const AppRouter = () => {

   

    return (
        <Router history={history}>
            <div>
                <Switch>
                        <PublicRoute path="/" component={LoginPage} exact={true}/>
                        <PrivateRoute path="/dashboard" component={MainDashboard}/>
                        <PrivateRoute path="/manage-recipes" component={ManageRecipes}/>
                        <PrivateRoute path="/edit/:id" component={RecipeEdit} />
                        <PrivateRoute path="/recipe-picker/:id/:day" component={RecipePicker} />
                        <PrivateRoute path="/new-recipe" component={NewRecipe} />
                        <PrivateRoute path="/ordered-groceries/:id" component={OrderedGroceries}/>
                        <Route component={NotFound}/>  
                </Switch>
            </div>
        </Router>
    )
}

export default AppRouter
