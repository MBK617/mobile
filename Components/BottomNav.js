import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';

const feedRoute = () => <Text>placeholder for feed</Text>;

const mapRoute = () => <Text>placeholder for whatever this is</Text>;

const eventsRoute = () => <Text>placeholder for events</Text>;

const bottomNav = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'feed', title: 'Feed', icon: 'home' },
    { key: 'map', title: 'Map', icon: 'map-marker-radius' },
    { key: 'event', title: 'Events', icon: 'calender-range' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    feed: feedRoute,
    map: mapRoute,
    event: eventsRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default bottomNav;