import * as React from 'react';

// Screen and Navigation
import Screens from './screens';
import { NavigationContainer } from '@react-navigation/native';

const Application = () => {

  return (
    <NavigationContainer>
      <Screens/>
    </NavigationContainer>
  )

};

export default Application;