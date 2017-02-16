import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  Platform,
} from 'react-native';

import Card from './Card';

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
            <Image 
              style={styles.image} 
              resizeMode="contain" 
              source={require('../img/red-dress.png')}
            />
            <Image 
              style={styles.image} 
              resizeMode="contain" 
              source={require('../img/blue-dress.png')}
            />
            <Image 
              style={styles.image} 
              resizeMode="contain" 
              source={require('../img/green-dress.png')}
            />
            <Image 
              style={styles.image} 
              resizeMode="contain" 
              source={require('../img/yellow-dress.png')}
            />
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
  image: {
    width: Dimensions.get('window').width,
  },
});

export default clothCard;