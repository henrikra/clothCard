import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Card from './Card';

class clothCard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.images} />
        <Card />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7E7EF',
  },
  images: {
    flex: 1,
  }
});

export default clothCard;