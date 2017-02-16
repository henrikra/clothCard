import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Card = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.colors}>
          <View style={[styles.color, styles.red]} />
          <View style={[styles.color, styles.blue]} />
          <View style={[styles.color, styles.green]} />
          <View style={[styles.color, styles.yellow]} />
        </View>
        <Text style={styles.productName}>REGLAN CHECK SHIRT</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.currency}>$</Text><Text style={styles.price}>129.00</Text>
        </View>
        <View style={styles.sizes}>
          <View style={styles.size}>
            <Text style={styles.sizeText}>S</Text>
          </View>
          <View style={[styles.size, styles.sizeSelected]}>
            <Text style={[styles.sizeText, styles.sizeTextSelected]}>M</Text>
          </View>
          <View style={styles.size}>
            <Text style={styles.sizeText}>L</Text>
          </View>
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
    width: 35,
    height: 35,
    marginHorizontal: 7,
    borderRadius: 30,
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
    width: 40,
    height: 40,
  },
  sizeTextSelected: {
    color: '#ffffff',
  },
});

export default Card;