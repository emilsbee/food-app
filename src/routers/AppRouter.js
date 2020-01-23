// External imports
import React from 'react'
import { createBrowserHistory } from 'history'
import {Router, Route, Switch} from 'react-router-dom'


// Internal imports
import MainDashboard from '../components/MainDashboard/MainDashboard'
import LoginPage from '../components/LoginPage/LoginPage'
import ManageRecipes from '../components/ManageRecipes/ManageRecipes'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

export const history = createBrowserHistory()

const AppRouter = () => {

   

    return (
        <Router history={history}>
            <div>
                <Switch>
                        <PrivateRoute path="/dashboard" component={MainDashboard}/>
                        <PrivateRoute path="/manage-recipes" component={ManageRecipes}/>
                        <PublicRoute path="/" component={LoginPage} exact={true}/>
                        
                </Switch>
            </div>
        </Router>
    )
}

export default AppRouter
