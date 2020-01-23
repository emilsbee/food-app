// External imports
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useStoreState } from 'easy-peasy'


const PublicRoute = (props) => {

    const uid = useStoreState(state => state.auth.uid)
    const isAuthenticated = !!uid
    const Component = props.component


    return (
        <Route path={props.path} component={() => (
            isAuthenticated ? (
                <Redirect to="/dashboard"/>
            ) : (
                <Component/>
            )
        )}>

        </Route>
    )
}

export default PublicRoute