import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import Routes from './App.js'

class index extends Component {
   render() {
      return (
         <Routes />
      )
   }
}
export default index

AppRegistry.registerComponent('Bismillah', () => index);
