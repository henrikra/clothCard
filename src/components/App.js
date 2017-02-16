import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
  Animated,
  Image,
  Dimensions,
} from 'react-native';

import Card from './Card';

const {width: screenWidth} = Dimensions.get('window');
const halfScreenWidth = screenWidth / 2;


const product = {
  sizes: ['s', 'm', 'l'],
  colors: [
    {image: require('../img/red-dress.png'), color: 'red'},
    {image: require('../img/blue-dress.png'), color: 'blue'},
    {image: require('../img/green-dress.png'), color: 'green'},
    {image: require('../img/yellow-dress.png'), color: 'yellow'},
  ],
};

class clothCard extends Component {
  state = {
    scrollX: new Animated.Value(0),
  }

  scrollToImage = index => {
    this.images.scrollTo({x: index * screenWidth})
  }
  
  render() {
    const {scrollX} = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.images}>
          <ScrollView
            ref={images => {this.images = images;}}
            horizontal 
            pagingEnabled 
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}]
            )}
          >
            {product.colors.map((product, index) => {
              const multiplier = screenWidth * index;
              return (
                <Animated.Image 
                  key={index}
                  style={[
                    styles.image,
                    {
                      opacity: scrollX.interpolate({
                        inputRange: [-halfScreenWidth + multiplier, multiplier, halfScreenWidth + multiplier],
                        outputRange: [0, 1 , 0],
                      })
                    },
                  ]} 
                  resizeMode="contain" 
                  source={product.image}
                />
              );
            })}
          </ScrollView>
        </View>
        <Card onColorPress={this.scrollToImage} colors={product.colors.map(product => product.color)} />
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
    width: screenWidth,
  },
});

export default clothCard;