import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = ({onsetUserdAuth}) => {


  const emailField = useRef();
  const passwordField = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [error,setError] = useState(null)
  const [isLoading,setIsLoading] = useState(false)

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) =>{
      event.preventDefault();
      let extractPassword = passwordField.current.value;
      let extractEmail = emailField.current.value;
       setIsLoading(true)
      if(isLogin){

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCJP-QToDvSItqm9P5mPuAG1s3xI6CwdDQ',{
          method: 'POST',
          body: JSON.stringify({email:extractEmail,password:extractPassword,returnSecureToken:true}),
          headers:{
            'Content-Type' : 'application/json'
          }
        }).then(resp =>{
          setIsLoading(false)
           if(resp.ok){
             resp.json().then(resp => onsetUserdAuth(resp.idToken))
             setError(null)
           }else{
                resp.json().then(resp =>{
                  console.log(resp.error.message)
                  setError(resp.error.message)
                })
                
           }
         })

      }else{
         fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCJP-QToDvSItqm9P5mPuAG1s3xI6CwdDQ',{
          method: 'POST',
          body: JSON.stringify({email:extractEmail,password:extractPassword,returnSecureToken:true}),
          headers:{
            'Content-Type' : 'application/json'
          }
         }).then(resp =>{
          setIsLoading(false)
           if(resp.ok){
             resp.json().then(resp => console.log(resp))
             setError(null)
           }else{
                resp.json().then(resp =>{
                  console.log(resp.error.message)
                  setError(resp.error.message)
                })
                
           }
         })
      }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler} >
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailField}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordField}
          />
        </div>
        {error && <p style={{color:'red'}}>{error}</p>}
        
        <div className={classes.actions}>
        {isLoading && <p>Loading please wait...</p>}
        {!isLoading && <button type='submit'>
          {!isLogin ? 'Create account' : 'Login'}
          </button>}
        
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
