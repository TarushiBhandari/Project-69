import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View } from 'react-native';
import scanScreen from './screens/scanScreen';

export default class App extends React.Component{
  render(){
    return(
      <View>
        <scanScreen/>
      </View>
    )
  }
}
