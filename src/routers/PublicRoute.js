import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useStoreState } from 'easy-peasy'

export default (props) => {

    const uid = useStoreState(state => state.uid)
    let Component = props.component
    const isAuthenticated = (uid) => {
        if (uid === '') {
            return false
        } else {
            return true
        }
    }

    return (<Route component={() => (
        isAuthenticated(uid) ? (
            <Redirect to="/dashboard"/>
        ) : (
            <div>
                <Component />
            </div>
        )
    )}/>
)}








