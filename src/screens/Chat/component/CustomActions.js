import PropTypes from 'prop-types';
import React from 'react';
import {
  StyleSheet,
  Text,
  Animated,
  TouchableOpacity,
  View,
  ViewPropTypes,
  TouchableWithoutFeedback,
  LogBox,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  getLocationAsync,
  startRecordAsync,
  stopRecordAsync,
  takePictureAsync,
} from './mediaUtils';
var ACTION_TIMER = 400;
var COLORS = ['rgb(255,255,255)', 'rgb(111,235,62)'];
export default class CustomActions extends React.Component {
  state = {
    pressAction: new Animated.Value(0),
    textComplete: '',
    buttonWidth: 0,
    buttonHeight: 0,
  };

  UNSAFE_componentWillMount() {
    this._value = 0;
    this.state.pressAction.addListener((v) => (this._value = v.value));
  }

  handlePressIn = () => {
    Animated.timing(this.state.pressAction, {
      duration: ACTION_TIMER,
      toValue: 1,
      // useNativeDriver: true,
    }).start(this.animationActionComplete);
    console.log('handlePressIn');

    startRecordAsync();
  };

  handlePressOut = () => {
    Animated.timing(this.state.pressAction, {
      duration: this._value * ACTION_TIMER,
      toValue: 0,
      // useNativeDriver: false,
    }).start();
    console.log('handlePressOut');
    const {onSend} = this.props;
    const data = stopRecordAsync(onSend);
  };

  animationActionComplete = () => {
    var message = '';
    // if (this._value === 1) {
    //   message = 'You held it long enough to fire the action!';
    // }
    this.setState({
      textComplete: message,
    });
  };

  getButtonWidthLayout = (e) => {
    this.setState({
      buttonWidth: e.nativeEvent.layout.width - 6,
      buttonHeight: e.nativeEvent.layout.height - 6,
    });
  };

  getProgressStyles = () => {
    var width = this.state.pressAction.interpolate({
      inputRange: [0, 1],
      outputRange: [0, this.state.buttonWidth],
    });
    var bgColor = this.state.pressAction.interpolate({
      inputRange: [0, 1],
      outputRange: COLORS,
    });
    return {
      width: width,
      height: this.state.buttonHeight,
      backgroundColor: bgColor,
    };
  };

  onActionsPress = () => {
    const options = ['Gửi Ảnh', 'Ghi Âm', 'Trở lại'];
    const cancelButtonIndex = options.length - 1;
    this.context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        const {onSend} = this.props;
        switch (buttonIndex) {
          case 0:
            takePictureAsync(onSend);
            return;
          case 1:
            takeRecordAsync(onSend);
            return;
          default:
        }
      },
    );
  };

  renderIcon = () => {
    if (this.props.renderIcon) {
      return this.props.renderIcon();
    }
    return (
      <View style={[styles.wrapper, this.props.wrapperStyle]}>
        <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
      </View>
    );
  };

  render() {
    LogBox.ignoreAllLogs(); //Ignore all log notifications
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPressIn={this.handlePressIn}
          onPressOut={this.handlePressOut}>
          <View style={styles.button} onLayout={this.getButtonWidthLayout}>
            <Animated.View style={[styles.bgFill, this.getProgressStyles()]} />
            <Icon name="microphone" size={20} color="#900" />
          </View>
        </TouchableWithoutFeedback>
        <View>
          <Text>{this.state.textComplete}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
  },
  button: {
    // padding: 20,
    // borderWidth: 3,
    // borderColor: '#111',
  },
  text: {
    backgroundColor: 'transparent',
    color: '#111',
  },
  bgFill: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

CustomActions.contextTypes = {
  actionSheet: PropTypes.func,
};

CustomActions.defaultProps = {
  onSend: () => {},
  options: {},
  renderIcon: null,
  containerStyle: {},
  wrapperStyle: {},
  iconTextStyle: {},
};

CustomActions.propTypes = {
  onSend: PropTypes.func,
  options: PropTypes.object,
  renderIcon: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  wrapperStyle: ViewPropTypes.style,
  iconTextStyle: Text.propTypes.style,
};
