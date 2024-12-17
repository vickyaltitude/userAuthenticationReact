import { Fragment } from 'react';

import MainNavigation from './MainNavigation';

const Layout = (props) => {
  
  return (
    <Fragment>
      <MainNavigation userToken={props.userToken} onSetUserAuthNull={props.onSetUserAuthNull}/>
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
