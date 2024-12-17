import { Fragment } from 'react';

import MainNavigation from './MainNavigation';

const Layout = (props) => {
  
  return (
    <Fragment>
      <MainNavigation userToken={props.userToken} />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
