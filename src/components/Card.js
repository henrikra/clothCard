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
    marginTop: 15,
    fontSize: 18,
    letterSpacing: 1,
    fontWeight: '600',
    color: '#333333',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: 10,
  },
  price: {
    fontSize: 20,
    letterSpacing: 2,
    color: '#555555',
  },
  currency: {
    color: '#555555',
    marginBottom: 1,
  }
});

export default Card;