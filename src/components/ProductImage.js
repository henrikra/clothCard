import React from 'react';
import {Image, StyleSheet, Dimensions} from 'react-native';

const ProductImage = ({source}) => {
  return (
    <Image 
      style={styles.image} 
      resizeMode="contain" 
      source={source}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('window').width,
  },
});

export default ProductImage;