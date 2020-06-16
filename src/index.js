// External imports
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { createStore, StoreProvider } from 'easy-peasy'


// Internal imports
import firebaseModel from './models/firebase'
import recipesModel from './models/recipes/recipes'
import weeksModel from './models/weeks';
import newWeeksModel from './models/weeks/newWeeks'
import groceriesModel from './models/groceries'
import initialiser from './models/initialiser'
import LoadingPage from './components/LoadingPage/LoadingPage'
import { firebase } from './components/firebase/firebase'
import AppRouter, { history } from './routers/AppRouter'
import './styles/styles.scss'

require('dotenv').config()


const store = createStore({
    auth: firebaseModel,
    recipes: recipesModel,
    weeks: weeksModel,
    newWeeks: newWeeksModel,
    groceries: groceriesModel,
    init: initialiser
})


const jsx = (
    <StoreProvider store={store}>
        <AppRouter/>
    </StoreProvider>
)

let hasRendered = false;
const renderApp = () => {
    if(!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('root'))
        hasRendered = true;
    }
}
ReactDOM.render(<LoadingPage/>,document.getElementById('root'));

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch.auth.login(user.uid)
        store.dispatch.init.initialiseUser().then(() => {
            renderApp()
            if (history.location.pathname === '/' || history.location.pathname === '/sign-up') {
                history.push(`/dashboard`)
            }
        })
    } else {
        store.dispatch.auth.logout()
        renderApp()
        history.push('/')
    }
})

export { store }

serviceWorker.unregister();
