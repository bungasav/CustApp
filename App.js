/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux'
import Home from './src/component/Home';
import Service from './src/component/Service';
import Product from './src/component/Product';
import { Platform, StyleSheet, Text, View } from 'react-native';

const Routes = () => (
  <Router>
    <Scene key="root">
      <Scene key="service" hideNavBar={true} component={Service}  />
      <Scene key="home" component={Home} hideNavBar={true} initial={true} />
      <Scene key="product" hideNavBar={true} component={Product} />
    </Scene>
  </Router>
)
export default Routes