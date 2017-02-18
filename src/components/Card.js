import React, {Component} from 'react';
import {View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  LayoutAnimation,
  PanResponder,
  Animated,
} from 'react-native';

import {halfScreenHeight} from '../screen';
import {isAndroid} from '../platform';

const scrollTo = dy => {
  const isFarEnough = Math.abs(dy) > 50;
  const isDown = dy > 0;
  if (isDown) {
    return isFarEnough ? halfScreenHeight : 0;
  }
  else {
    return isFarEnough ? 0 : halfScreenHeight
  }
};

class Card extends Component {
  state = {
    topAnimation: new Animated.Value(halfScreenHeight),
  }
  
  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderGrant: () => {
      this.state.topAnimation.setOffset(this.state.topAnimation._value);
      this.state.topAnimation.setValue(0);
    },
    onPanResponderMove: Animated.event([null, {dy: this.state.topAnimation}]),
    onPanResponderRelease: (evt, gestureState) => {
      this.state.topAnimation.flattenOffset();
      Animated.timing(
        this.state.topAnimation, 
        {
          toValue: scrollTo(gestureState.dy), 
          duration: 200,
        },
      ).start();
    }
  })
  
  componentWillUpdate(nextProps, nextState) {
    if (this.props.selectedSizeIndex !== nextProps.selectedSizeIndex) {
      LayoutAnimation.spring();
    } 
  }

  render() {
    const {
      colors, 
      onColorPress, 
      sizes, 
      selectedSizeIndex, 
      onSizePress, 
      onAddToCardPress, 
      name, 
      selectedColorIndex,
    } = this.props;

    return (
      <Animated.View
        style={[
          styles.container, 
          {top: this.state.topAnimation.interpolate({
            inputRange: [0, halfScreenHeight],
            outputRange: [0 + isAndroid ? 0 : 20, halfScreenHeight],
            extrapolate: 'clamp',
          })},
        ]}
      >
        <View style={styles.card} {...this.panResponder.panHandlers}>
          <View style={styles.colors} >
            {colors.map((color, index) => 
              <TouchableOpacity key={color} style={[styles.color, styles[color]]} onPress={() => onColorPress(index)}>
                {selectedColorIndex === index && <View style={styles.colorSelected} />}
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.productName}>{name.toUpperCase()}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.currency}>$</Text><Text style={styles.price}>129.00</Text>
          </View>
          <View style={styles.sizes}>
            {sizes.map((size, index) => {
              const isSelectedSize = selectedSizeIndex === index;
              return (
                <View key={index} style={[styles.size, isSelectedSize && styles.sizeSelected]}>
                  <TouchableOpacity 
                    style={[styles.sizePressable, isSelectedSize && styles.sizePressableSelected]} 
                    onPress={() => onSizePress(index)}
                  >
                    <Text style={[styles.sizeText, isSelectedSize && styles.sizeTextSelected]}>
                      {size.toUpperCase()}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
          <Text style={styles.description}>Oversized shirt Check print Shirt Collar.</Text>
          <View style={styles.addToCardButton}>
            <TouchableOpacity style={styles.addToCardButtonPressable} onPress={onAddToCardPress}>
              <Text style={styles.addToCardButtonText}>ADD TO CART</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#ffffff',
    flex: 1,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    padding: 20,
  },
  colors: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  color: {
    width: 25,
    height: 25,
    marginHorizontal: 7,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorSelected: {
    width: 15,
    height: 15,
    borderColor: '#ffffff',
    borderWidth: 2,
    borderRadius: 15,
  },
  red: {
    backgroundColor: '#F75251',
  },
  blue: {
    backgroundColor: '#5380AB',
  },
  green: {
    backgroundColor: '#68BAAE',
  },
  yellow: {
    backgroundColor: '#FFE664',
  },
  productName: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    letterSpacing: 1,
    fontWeight: '600',
    color: '#193B4B',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: 5,
  },
  price: {
    fontSize: 20,
    letterSpacing: 2,
    color: '#4D5762',
  },
  currency: {
    color: '#4D5762',
    marginBottom: 1,
  },
  sizes: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    alignItems: 'center',
  },
  size: {
    borderWidth: 2,
    borderColor: '#9BACB3',
    marginHorizontal: 7,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizePressable: {
    height: 35,
    width: 35,
    justifyContent: 'center',
  },
  sizeText: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 12,
    color: '#9BACB3',
  },
  sizeSelected: {
    backgroundColor: '#577380',
    borderColor: '#577380',
  },
  sizePressableSelected: {
    width: 38,
    height: 38,
  },
  sizeTextSelected: {
    color: '#ffffff',
  },
  description: {
    textAlign: 'center',
    marginTop: 20,
    color: '#4D5762',
    flexGrow: 1,
    letterSpacing: 1,
  },
  addToCardButton: {
    borderWidth: 2,
    borderColor: '#577380',
  },
  addToCardButtonPressable: {
    paddingVertical: 10,
  },
  addToCardButtonText: {
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: 1,
    fontSize: 12,
    color: '#577380'
  }
});

export default Card;