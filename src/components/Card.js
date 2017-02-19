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

const cardState = {
  open: 0,
  close: halfScreenHeight,
};

const scrollTo = (dy, vy) => {
  const isVelocityDown = vy > 0;
  const isDown = dy > 0;
  const hasVelocity = Math.abs(vy) > 0.1;

  if (isDown) {
    if (hasVelocity) {
      return isVelocityDown ? cardState.close : cardState.open;
    }

    return cardState.close;
  }
  else {
    if (hasVelocity) {
      return !isVelocityDown ? cardState.open : cardState.close;
    }

    return cardState.open;
  }
};

class Card extends Component {
  state = {
    topAnimation: new Animated.Value(cardState.close),
  }

  panResponder = PanResponder.create({
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => Math.abs(gestureState.dy) > 10,
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
          toValue: scrollTo(gestureState.dy, gestureState.vy), 
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
            inputRange: [cardState.open, cardState.close],
            outputRange: [isAndroid ? 0 : 20, halfScreenHeight],
            extrapolate: 'clamp',
          })},
        ]}
      >
        <View style={styles.card} {...this.panResponder.panHandlers}>
          <View style={styles.colors} >
            {colors.map((color, index) => 
              <TouchableOpacity
                key={color} 
                style={[styles.color, styles[color]]} 
                onPress={() => onColorPress(index)}
              >
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
          <Animated.View
            style={[
              styles.extraInfo,
              {
                opacity: this.state.topAnimation.interpolate({
                  inputRange: [cardState.open, cardState.close],
                  outputRange: [1, 0],
                  extrapolate: 'clamp',
                }),
              },
            ]}
          >
            <View style={styles.features}>
              <View style={styles.feature}>
                <View style={styles.featureBullet} />
                <Text style={styles.featureText}>Soft woven gauze</Text>
              </View>
              <View style={styles.feature}>
                <View style={styles.featureBullet} />
                <Text style={styles.featureText}>Flowy, cinched shape</Text>
              </View>
              <View style={styles.feature}>
                <View style={styles.featureBullet} />
                <Text style={styles.featureText}>Split crew neck</Text>
              </View>
              <View style={styles.feature}>
                <View style={styles.featureBullet} />
                <Text style={styles.featureText}>Lace-up blacket</Text>
              </View>
            </View>
            <View style={styles.socials}>
              <View style={[styles.social, styles.socialFavourite]}>
                <TouchableOpacity style={styles.socialPressable}>
                  <Text style={styles.socialText}>57 Favourite</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.social, styles.socialReviews]}>
                <TouchableOpacity style={styles.socialPressable}>
                  <Text style={styles.socialText}>31 Reviews</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
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
    marginVertical: 20,
    color: '#4D5762',
    letterSpacing: 1,
  },
  extraInfo: {
    overflow: 'hidden',
    flex: 1,
  },
  features: {
    borderTopColor: '#9BACB3',
    borderTopWidth: 2,
    padding: 20,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  featureBullet: {
    width: 10,
    height: 10,
    backgroundColor: '#9BACB3',
    borderRadius: 10,
    marginRight: 10,
  },
  featureText: {
    letterSpacing: 1,
  },
  socials: {
    flexDirection: 'row',
  },
  social: {
    flex: 1,
    borderTopColor: '#9BACB3',
    borderTopWidth: 2,
    borderBottomColor: '#9BACB3',
    borderBottomWidth: 2,
  },
  socialPressable: {
    padding: 10,
  },
  socialFavourite: {
    borderLeftColor: '#9BACB3',
    borderLeftWidth: 2,
    borderRightColor: '#9BACB3',
    borderRightWidth: 1,
  },
  socialReviews: {
    borderRightColor: '#9BACB3',
    borderRightWidth: 2,
    borderLeftColor: '#9BACB3',
    borderLeftWidth: 1,
  },
  socialText: {
    fontSize: 16,
    letterSpacing: 1,
    textAlign: 'center',
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