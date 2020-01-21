import React from 'react'
import { useStoreActions } from 'easy-peasy'


const LoginPage = () => {
    const startLogin = useStoreActions(actions => actions.auth.startLogin)
    
    const beginLogin = () => {
        startLogin()
    }

    return (
        <div>
            Login
            <div>
                <button onClick={beginLogin}>Login with google</button>
            </div>
        </div>
    )
}

export default LoginPage