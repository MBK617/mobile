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
  { key: 'home', icon: 'home', authenticated: false },
  { key: 'events', icon: 'calendar', authenticated: true },
  { key: 'inbox', icon: 'forum', authenticated: true },
  { key: 'more', icon: 'dots-horizontal', authenticated: false },
]

const App = () => {
  const isLoggedIn = useLoginStatus();
  const { history, path, goTo, goBack } = useHistory();

  const [index, setIndex] = React.useState(0);
  const [routes, setRoutes] = React.useState(pages.filter(({authenticated}) => isLoggedIn || !authenticated).map(({ authenticated, ...page }) => page));

  useEffect(() => {
    const newRoutes = pages.filter(({authenticated}) => isLoggedIn || !authenticated).map(({ authenticated, ...page }) => page);
    setIndex(newRoutes.findIndex(route => route.key === routes[index].key))
    setRoutes(newRoutes);
  }, [isLoggedIn])

  useEffect(() => {
    const newPath = routes[index].key;
    goTo(newPath);
  }, [index])

  useEffect(() => {
    const newIndex = routes.findIndex(page => page.key === path?.split('/')[0]);
    setIndex(newIndex);
  }, [path])

  const renderScene =  () => {
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
        <Appbar.BackAction onPress={goBack} style={{opacity: history.length > 1 ? 1 : 0, transition: '.2s'}}/>
        <Image source={require('assets/mbklogo.jpg')} style={styles.logo}/>
        <Appbar.Action icon="bell" />
      </Appbar.Header>
      <BottomNavigation
        barStyle={{ backgroundColor: '#222' }}
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
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