import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Card = ({colors, onColorPress, sizes, selectedSizeIndex, onSizePress, onAddToCardPress, name}) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.colors}>
          {colors.map((color, index) => 
            <TouchableOpacity key={color} style={[styles.color, styles[color]]} onPress={() => onColorPress(index)} />
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
          <TouchableOpacity onPress={onAddToCardPress}>
            <Text style={styles.addToCardButtonText}>ADD TO CART</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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