import React from 'react'
import { useStoreActions } from 'easy-peasy'

const MainDashboard = () => {
    const startLogout = useStoreActions(actions => actions.auth.startLogout)

    const beginLogout = () => {
        startLogout()
    }

    return (
        <div>
            Main MainDashboard
            <button onClick={beginLogout}>Log out</button>
        </div>
    )
}

export default MainDashboard