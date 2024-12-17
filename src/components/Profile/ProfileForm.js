import classes from './ProfileForm.module.css';
import { useRef } from 'react';

const ProfileForm = ({userToken}) => {

  const newPassword = useRef();
   
  function handlePasswordChange(event){
     event.preventDefault()
     fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCJP-QToDvSItqm9P5mPuAG1s3xI6CwdDQ',{
      method: 'POST',
      body: JSON.stringify({idToken: userToken,
        password: newPassword.current.value,
        returnSecureToken: true}),
        headers:{
          'Content-Type' : 'application/json'
        }
      
     }).then(resp =>{
     resp.json().then(resp => console.log(resp))
        
     })
  }
  
  return (
    <form className={classes.form} onSubmit={handlePasswordChange}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPassword} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
