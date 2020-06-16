// External imports
import React, { useState, useEffect } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'

// Internal imports
import './SignUp.scss'
import  google  from './utils/google-logo.png'
import { ReactComponent as LeftArrow } from './utils/left-arrow.svg'
import LoadingPage from '../LoadingPage/LoadingPage'

var validator = require("email-validator");


const SignUp = (props) => {
  const startLogin = useStoreActions(actions => actions.auth.startLogin)
  const startSignUpWithEmailAndPassword = useStoreActions(actions => actions.auth.startSignUpWithEmailAndPassword)
  const setErrorMessage = useStoreActions(actions => actions.auth.setErrorMessage)
  const errorMessage = useStoreState(state => state.auth.errorMessage)
  
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
      startLogin()
  }

 const beginEmailAndPasswordLogin = (e) => {
     e.preventDefault()
     if (validator.validate(email)) {
      setLoading(true)
      startSignUpWithEmailAndPassword({
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
    <div id="sign-up">
     { loading ?
    <LoadingPage/>
     :
     <div id="sign-up-loading-container">
     <div id="sign-up-back-container">
        <LeftArrow id="sign-up-back" onClick={() => props.history.push('/')}/>
      </div>
      <div id="sign-up-outer-container">
          
                <div id="sign-up-error-message">
                {errorMessage && errorMessage}
            </div>
          
          <div id="sign-up-container">
              <div id="sign-up-title">
                  Sign up
              </div>
              <div id="sign-up-email-password-container">
                  <div id="sign-up-email">
                      <form onSubmit={(e) => e.preventDefault()}>
                          <input 
                              style={{"boxShadow": inputFocus === 'email'&&"0 8px 16px 0 rgba(0,0,0,0.2)"}}
                              onFocus={() => setInputFocus('email')}
                              onBlur={() => setInputFocus(false)}
                              placeholder="Email"
                              id="sign-up-email-input"
                              value={email} 
                              onChange={(e) => setEmail(e.target.value)}
                          />
                      </form>
                  </div>
                  <div id="sign-up-password">
                      <form onSubmit={beginEmailAndPasswordLogin}>
                          <input 
                              style={{"boxShadow": inputFocus === 'password'&&"0 8px 16px 0 rgba(0,0,0,0.2)"}}
                              onFocus={() => setInputFocus('password')}
                              onBlur={() => setInputFocus(false)}
                              placeholder="Password" 
                              type="password"
                              id="sign-up-email-input"
                              value={password} 
                              onChange={(e) => setPassword(e.target.value)}
                          />
                      </form>
                  </div>
              </div>
              <div id="sign-up-button-container">
                <div 
                  id="sign-up-button"
                  onClick={beginEmailAndPasswordLogin}
                >
                  Sign up
                </div>
              </div>
              <div id="sign-up-label">
                    Or sign up with one of the others
                </div>
              <div 
                    onClick={beginLogin}
                    id="sign-up-with-google-container"
                > 
                    <div id="sign-up-with-google-inner-container">
                        <img 
                            id="google-logo" 
                            alt="Google" 
                            src={google}
                        />
                            Sign up with google
                    </div>
                </div>
          </div>
      </div>
      </div>
      }
      </div>
  )
};

export default SignUp;
