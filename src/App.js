import { Switch, Route,Redirect } from 'react-router-dom';
import { useState,useEffect } from 'react';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';

function App() {
  
  const [userToken,setUserToken] = useState(null)

  function setUserdAuth(UID){
    setUserToken(UID)
    localStorage.setItem('userAuth',JSON.stringify(UID))
  }

  function setUserAuthNull(){
    setUserToken(null)
    localStorage.removeItem('userAuth')
  }

  useEffect(()=>{
    
    let setLogout;

    setUserToken(()=>JSON.parse(localStorage.getItem('userAuth')) || null);
    
         setLogout = setTimeout(()=>{
      setUserToken(null)
      localStorage.removeItem('userAuth')
    },10000)
    

    return ()=> clearTimeout(setLogout)
    
  },[userToken])

  return (
    <Layout userToken={userToken} onSetUserAuthNull={setUserAuthNull}>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {!userToken &&   <Route path='/auth'>
          <AuthPage onsetUserdAuth={setUserdAuth}/>
        </Route>}
      
        {userToken &&  <Route path='/profile'>
          <UserProfile userToken={userToken} />
        </Route>}

        <Route path="*">
               <Redirect to="/"></Redirect>
        </Route>
       
      </Switch>
    </Layout>
  );
}

export default App;
