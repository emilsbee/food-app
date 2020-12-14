// External imports
import React, { useState, useEffect } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'


// Internal imports
import './LoginPage.scss'
import SignUp from '../SignUp'
import  google  from './utils/google-logo.png'
import { ReactComponent as Anon } from './utils/anonymous.svg'
import LoadingPage from '../LoadingPage/LoadingPage'

var validator = require("email-validator");


const LoginPage = (props) => {
    const startLogin = useStoreActions(actions => actions.auth.startLogin)
    const startLoginWithEmailAndPassword = useStoreActions(actions => actions.auth.startLoginWithEmailAndPassword)
    const startLoginAnonymously = useStoreActions(actions => actions.auth.startLoginAnonymously)
    const errorMessage = useStoreState(state => state.auth.errorMessage)
    const setErrorMessage = useStoreActions(actions => actions.auth.setErrorMessage)

    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [inputFocus, setInputFocus] = useState(false)

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        return () => {
          setErrorMessage(false)
          setLoading(false)
        }
      }, [])

    const beginLogin = () => {
        setLoading(true)
        startLogin()
    }

    const beginAnonLogin = () => {
        setLoading(true)
        startLoginAnonymously()
    }

   const beginEmailAndPasswordLogin = (e) => {
       e.preventDefault()
       
       if (validator.validate(email)) {
           setLoading(true)
           startLoginWithEmailAndPassword({
               email,
               password
           }).then(() => {
               setLoading(false)
           })
        } else {
            setErrorMessage('The email address is badly formated.')
        }
   }

    return (
        <div id="login-outer-container">
            {loading ? 
            <LoadingPage/>
            :
            <div id="login-container">
                
                <div id="login-error-message">
                    {errorMessage && errorMessage}
                </div>
                
                <div id="login-title">
                    Login
                </div>
                <div id="login-email-password-container">
                    <div id="login-email">
                        <form onSubmit={(e) => e.preventDefault()}>
                            <input 
                                style={{"boxShadow": inputFocus === 'email'&&"0 8px 16px 0 rgba(0,0,0,0.2)"}}
                                onFocus={() => setInputFocus('email')}
                                onBlur={() => setInputFocus(false)}
                                placeholder="Email"
                                id="login-email-input"
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </form>
                    </div>
                    <div id="login-password">
                        <form onSubmit={beginEmailAndPasswordLogin}>
                            <input 
                                style={{"boxShadow": inputFocus === 'password'&&"0 8px 16px 0 rgba(0,0,0,0.2)"}}
                                onFocus={() => setInputFocus('password')}
                                onBlur={() => setInputFocus(false)}
                                placeholder="Password" 
                                type="password"
                                id="login-email-input"
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </form>
                    </div>
                </div>
                <div id="login-button-container">
                <div 
                  id="login-button"
                  onClick={beginEmailAndPasswordLogin}
                >
                  Login
                </div>
              </div>
                <div id="login-label">
                    Or login with one of the others
                </div>

                <div 
                    onClick={beginLogin}
                    id="login-with-google-container"
                > 
                    <div id="login-with-google-inner-container">
                        <img 
                            id="google-logo" 
                            alt="Google" 
                            src={google}
                        />
                            Login with google
                    </div>
                </div>
                <div 
                    onClick={beginAnonLogin}
                    id="login-with-anon-container"
                > 
                    <div id="login-with-anon-inner-container">
                        <Anon 
                            id="anon-logo" 
                            alt="Anonymous" 
                            src={Anon}
                        />
                            Login anonymously
                    </div>
                </div>
                
                <div id="login-sign-up-container">
                    Don't have an account? 
                    <div onClick={() => props.history.push('/sign-up')} id="login-sign-up-button">
                        Sign up!
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default LoginPage