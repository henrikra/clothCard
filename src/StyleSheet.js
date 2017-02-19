import {StyleSheet} from 'react-native';
import R from 'ramda';

import {screenHeight} from './screen';

const iphone6Height = 667;
const normalizeStyle = styleValue => Math.round(screenHeight / iphone6Height * styleValue);
const mapfieldsToNormalize = R.evolve({
  fontSize: normalizeStyle,
  lineHeight: normalizeStyle,
  letterSpacing: normalizeStyle,
  width: normalizeStyle,
  height: normalizeStyle,
  margin: normalizeStyle,
  marginTop: normalizeStyle,
  marginBottom: normalizeStyle,
  marginLeft: normalizeStyle,
  marginRight: normalizeStyle,
  marginHorizontal: normalizeStyle,
  marginVertical: normalizeStyle,
  padding: normalizeStyle,
  paddingTop: normalizeStyle,
  paddingBottom: normalizeStyle,
  paddingLeft: normalizeStyle,
  paddingRight: normalizeStyle,
  paddingHorizontal: normalizeStyle,
  paddingVertical: normalizeStyle,
});
const normalizeStyles = R.map(mapfieldsToNormalize);

export default {
  create: styles => StyleSheet.create(normalizeStyles(styles))
};