import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';

const { width, height } = Dimensions.get('window');

const equalWidth =  (width / 2 ) 

export default class Card extends React.Component {
  render() {
    return (
      <TouchableWithoutFeedback>
        <View>
          <Image style={{ height: 150,  width : equalWidth}} source={this.props.image} resizeMode='cover' />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
