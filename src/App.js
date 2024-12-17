import { Switch, Route } from 'react-router-dom';
import { useState } from 'react';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';

function App() {
  
  const [userToken,setUserToken] = useState(null)

  function setUserdAuth(UID){
    setUserToken(UID)
  }

  function setUserAuthNull(){
    setUserToken(null)
  }

  return (
    <Layout userToken={userToken} onSetUserAuthNull={setUserAuthNull}>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route path='/auth'>
          <AuthPage onsetUserdAuth={setUserdAuth}/>
        </Route>
        <Route path='/profile'>
          <UserProfile userToken={userToken} />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
