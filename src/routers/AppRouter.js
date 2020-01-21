import React from 'react'
import { createBrowserHistory } from 'history'
import {Router, Route, Switch, Link, NavLink} from 'react-router-dom'
import MainDashboard from '../components/MainDashboard/MainDashboard'
import LoginPage from '../components/LoginPage/LoginPage'
import PublicRoute from './PublicRoute'

import { useStoreState } from 'easy-peasy'


export const history = createBrowserHistory()

const AppRouter = () => {

    const uid = useStoreState(state => state.auth.uid)
    const isAuthenticated = (uid) => {
        if (uid === '') {
            return false
        } else {
            return true
        }
    }

    return (
        <Router history={history}>
            <div>
                <Switch>
                    {isAuthenticated(uid) ? 
                        <Route path="/dashboard" component={MainDashboard}/>
                        :
                        <Route path="/" component={LoginPage} exact={true}/>
                    }
                    {/* <Route path="/" component={LoginPage} exact={true}/>
                    <Route path="/dashboard" component={MainDashboard}/> */}
                </Switch>
            </div>
        </Router>
    )
}

export default AppRouter
