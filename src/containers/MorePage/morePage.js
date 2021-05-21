import React from 'react';

import Navigation from './components/Navigation';
import LoginPage from './components/LoginPage';
import ProfilePage from './components/ProfilePage';
import SettingsPage from './components/SettingsPage';

import useHistory from 'hooks/useHistory';
import useLoginStatus from 'hooks/useLoginStatus';

const MorePage = () => {
  const isLoggedIn = useLoginStatus();
  const { path } = useHistory();

  const routes = [
    {
      name: "Log In",
      path: 'login',
      component: LoginPage,
      icon: 'account-circle',
      show: !isLoggedIn
    },{
      name: "My Profile",
      path: 'profile',
      component: ProfilePage,
      icon: 'account-circle',
      show: isLoggedIn
    },
    {
      name: "Settings",
      path: 'settings', 
      component: SettingsPage,
      icon: 'cog',
      show: isLoggedIn
    },
    {
      name: "Donate",
      icon: 'heart',
      external: 'https://www.paypal.com/donate/?cmd=_donations&business=bostonmbk617@gmail.com&item_name=My%20Brother%27s%20Keeper%20617A%20Boston%20Nonprofit%C2%A0&currency_code=USD&Z3JncnB0=',
      show: true
    }
  ]

  if(path.split('/').length > 1) {
    const localPath = path.split('/')[1]
    for(let route of routes) {
      if(route.path === localPath && route.show) {
        return React.createElement(route.component);
      }
    }
  }
  return <Navigation routes={routes}/>;
}

export default MorePage;