import { Link,useHistory } from 'react-router-dom';

import classes from './MainNavigation.module.css';

const MainNavigation = ({userToken,onSetUserAuthNull}) => {

  const history = useHistory();


  console.log(userToken)
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
        {!userToken && <li>
           
           <Link to='/auth'>Login</Link>
         </li>}
          {userToken && <> <li>
            <Link to='/profile'>Profile</Link>
          </li>
          <li>
            <button type="button" onClick={()=>{
              onSetUserAuthNull()
              history.replace('/auth')
            }
              }>Logout</button>
          </li> </>}
         
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
