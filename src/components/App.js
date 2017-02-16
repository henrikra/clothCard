import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Platform,
} from 'react-native';

import Card from './Card';
import ProductImage from './ProductImage';

class clothCard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.images}>
          <ScrollView
            horizontal 
            pagingEnabled 
            showsHorizontalScrollIndicator={false}
          >
            <ProductImage source={require('../img/red-dress.png')} />
            <ProductImage source={require('../img/blue-dress.png')} />
            <ProductImage source={require('../img/green-dress.png')} />
            <ProductImage source={require('../img/yellow-dress.png')} />
          </ScrollView>
        </View>
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
    marginTop: Platform.OS === 'ios' ? 20 : 0,
  },
});

export default clothCard;