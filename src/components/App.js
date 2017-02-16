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

const images = [
  require('../img/red-dress.png'),
  require('../img/blue-dress.png'),
  require('../img/green-dress.png'),
  require('../img/yellow-dress.png'),
];

class clothCard extends Component {
  state = {
    scrollX: new Animated.Value(0),
  }
  
  render() {
    const {scrollX} = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.images}>
          <ScrollView
            horizontal 
            pagingEnabled 
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}]
            )}
          >
            {images.map((image, index) => {
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
                  source={image}
                />
              );
            })}
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
    width: screenWidth,
  },
});

export default clothCard;