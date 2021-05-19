import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import { compose } from 'redux';

import { 
  Appbar, 
  BottomNavigation 
} from 'react-native-paper';

import injectSaga from 'utils/redux/injectSaga';
import injectReducer from 'utils/redux/injectReducer';

import useHistory from 'hooks/useHistory';
import useLoginStatus from 'hooks/useLoginStatus';

import styles from './styles';
import reducer from './reducer';
import saga from './saga';

import HomePage from '../HomePage';
import EventsPage from '../EventsPage';
import InboxPage from '../InboxPage';
import MorePage from '../MorePage';

const pages = [
  { path: 'home', key: 'home', icon: 'home', authenticated: false, accessibilityLabel: 'Home' },
  { path: 'events', key: 'events', icon: 'calendar', authenticated: true, accessibilityLabel: 'Events' },
  { path: 'inbox', key: 'inbox', icon: 'forum', authenticated: true, accessibilityLabel: 'Inbox' },
  { path: 'more', key: 'more', icon: 'dots-horizontal', authenticated: false, accessibilityLabel: 'More' },
]

const getRoutes = (isLoggedIn) => {
  return pages.filter(({authenticated}) => isLoggedIn || !authenticated).map(({ authenticated, ...page }) => page);
}

const App = () => {
  const isLoggedIn = useLoginStatus();
  const { history, path, goTo, goBack } = useHistory();
  const [index, setIndex] = React.useState(0);
  const [routes, setRoutes] = React.useState(getRoutes(isLoggedIn));

  useEffect(() => {
    const newRoutes = getRoutes(isLoggedIn);
    setIndex(newRoutes.findIndex(route => route.path === routes[index].path))
    setRoutes(newRoutes);
  }, [isLoggedIn])

  useEffect(() => {
    const newPath = routes[index].path;
    goTo(newPath);
  }, [index])

  useEffect(() => {
    const newIndex = routes.findIndex(page => page.path === path?.split('/')[0]);
    if(newIndex !== index) setIndex(newIndex);
  }, [path])

  const renderScene = () => {
    switch (path?.split('/')[0]) {
      case 'home':
        return <HomePage />;
      case 'events':
        return <EventsPage />;
      case 'inbox':
        return <InboxPage />;
      case 'more':
        return <MorePage />;
    }
  }
  
  return (
    <View style={styles.root}>
      <Appbar.Header 
        statusBarHeight={0}
        style={styles.header}
      > 
        <Appbar.BackAction 
          onPress={goBack} 
          disabled={history.length <= 1}
          style={{opacity: history.length > 1 ? 1 : 0, transition: '.2s'}}
        />
        <Image 
          source={require('assets/mbklogo.jpg')} 
          style={styles.logo}
        />
        <Appbar.Action 
          onPress={() => {}}
          icon="bell" 
          accessibilityLabel="Notifications"
        />
      </Appbar.Header>
      <BottomNavigation
        barStyle={{ backgroundColor: '#222' }}
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        sceneAnimationEnabled={true}
        renderScene={renderScene}
        shifting={false} 
        labeled={false} 
      />
    </View>
  );
}

const withReducer = injectReducer({ key: 'app', reducer });
const withSaga = injectSaga({ key: 'app', saga });

export default compose(withReducer, withSaga)(App);