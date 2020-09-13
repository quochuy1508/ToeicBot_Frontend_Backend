import React from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ViewPropTypes,
  PermissionsAndroid,
} from 'react-native';
import PropTypes from 'prop-types';

import CameraRollPicker from 'react-native-camera-roll-picker';
import NavBar, {NavButton, NavButtonText, NavTitle} from 'react-native-nav';

export default class CustomActions extends React.Component {
  constructor(props) {
    super(props);
    this._images = [];
    this.state = {
      modalVisible: false,
      num: 0,
      selected: [],
      rollPermissionExists: false,
    };
    this.onActionsPress = this.onActionsPress.bind(this);
    this.selectImages = this.selectImages.bind(this);
    this.getSelectedImages = this.getSelectedImages.bind(this);
    this.requestExternalStoreageRead = this.requestExternalStoreageRead.bind(
      this,
    );
  }

  // componentDidMount() {
  //   this.requestExternalStoreageRead();
  // }

  async requestExternalStoreageRead() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.setState({rollPermissionExists: true});
      } else {
        this.setState({rollPermissionExists: false});
      }
    } catch (err) {
      console.warn(err);
    }
  }

  async getSelectedImages(images, current) {
    if (await this.requestExternalStoreageRead()) {
      var num = images.length;

      this.setState({
        num: num,
        selected: images,
      });

      console.log(current);
      console.log(this.state.selected);
    }
  }

  setImages(images) {
    this._images = images;
  }

  getImages() {
    return this._images;
  }

  setModalVisible(visible = false) {
    this.setState({modalVisible: visible});
  }

  onActionsPress() {
    const options = ['Choose From Library', 'Send Location', 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    this.context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            this.setModalVisible(true);
            break;
          case 1:
            navigator.geolocation.getCurrentPosition(
              (position) => {
                this.props.onSend({
                  location: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                  },
                });
              },
              (error) => alert(error.message),
              {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
            );
            break;
          default:
        }
      },
    );
  }

  selectImages(images) {
    this.setImages(images);
  }

  renderNavBar() {
    return (
      <NavBar
        style={{
          statusBar: {
            backgroundColor: '#FFF',
          },
          navBar: {
            backgroundColor: '#FFF',
          },
        }}>
        <NavButton
          onPress={() => {
            this.setModalVisible(false);
          }}>
          <NavButtonText
            style={{
              color: '#000',
            }}>
            {'Cancel'}
          </NavButtonText>
        </NavButton>
        <NavTitle
          style={{
            color: '#000',
          }}>
          {'Camera Roll'}
        </NavTitle>
        <NavButton
          onPress={() => {
            this.setModalVisible(false);

            const images = this.getImages().map((image) => {
              return {
                image: image.uri,
              };
            });
            this.props.onSend(images);
            this.setImages([]);
          }}>
          <NavButtonText
            style={{
              color: '#000',
            }}>
            {'Send'}
          </NavButtonText>
        </NavButton>
      </NavBar>
    );
  }

  renderIcon() {
    if (this.props.icon) {
      return this.props.icon();
    }
    return (
      <View style={[styles.wrapper, this.props.wrapperStyle]}>
        <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
      </View>
    );
  }

  render() {
    return (
      <TouchableOpacity
        style={[styles.container, this.props.containerStyle]}
        onPress={this.onActionsPress}>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false);
          }}>
          {this.renderNavBar()}
          {this.state.rollPermissionExists && (
            <CameraRollPicker
              groupTypes="SavedPhotos"
              maximum={3}
              selected={this.state.selected}
              assetType="Photos"
              imagesPerRow={3}
              imageMargin={5}
              callback={this.getSelectedImages}
            />
          )}
        </Modal>
        {this.renderIcon()}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});

CustomActions.contextTypes = {
  actionSheet: PropTypes.func,
};

CustomActions.defaultProps = {
  onSend: () => {},
  options: {},
  icon: null,
  containerStyle: {},
  wrapperStyle: {},
  iconTextStyle: {},
};

CustomActions.propTypes = {
  onSend: PropTypes.func,
  options: PropTypes.object,
  icon: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  wrapperStyle: ViewPropTypes.style,
  iconTextStyle: ViewPropTypes.style,
};
