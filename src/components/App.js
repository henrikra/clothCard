import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Animated,
  Image,
  Dimensions,
  Alert,
} from 'react-native';

import Card from './Card';
import {screenWidth, halfScreenWidth} from '../screen';
import {isAndroid} from '../platform';

const product = {
  name: 'Reglan check shirt',
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
    selectedSizeIndex: 1,
    selectedColorIndex: 0,
  }

  selectColor = index => {
    this.setState({selectedColorIndex: index});
  }

  scrollToImage = index => {
    this.selectColor(index);
    this.images.scrollTo({x: index * screenWidth})
  }

  selectSize = index => {
    this.setState({selectedSizeIndex: index});
  }

  buyProduct = () => {
    const {selectedSizeIndex, selectedColorIndex} = this.state;
    const size = product.sizes[selectedSizeIndex].toUpperCase();
    const color = product.colors[selectedColorIndex].color;
    Alert.alert(`You have just bought:\n${product.name}\nSize: ${size}\nColor: ${color}`);
  }
  
  render() {
    const {scrollX, selectedSizeIndex, selectedColorIndex} = this.state;

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
            onMomentumScrollEnd={({nativeEvent}) => {
              this.selectColor(Math.round(nativeEvent.contentOffset.x / screenWidth));
            }}
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
        <View style={styles.spacer} />
        <Card 
          onColorPress={this.scrollToImage} 
          colors={product.colors.map(product => product.color)} 
          sizes={product.sizes}
          selectedSizeIndex={selectedSizeIndex}
          selectedColorIndex={selectedColorIndex}
          onSizePress={this.selectSize}
          onAddToCardPress={this.buyProduct}
          name={product.name}
        />
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
    marginTop: isAndroid ? 0 : 20,
  },
  image: {
    width: screenWidth,
  },
  spacer: {
    flex: 1,
  }
});

export default clothCard;