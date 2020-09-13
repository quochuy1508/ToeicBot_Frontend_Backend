// import {Linking} from 'expo';
// import * as Location from 'expo-location';
import ImagePicker from 'react-native-image-picker';
import {Alert, PermissionsAndroid, Linking} from 'react-native';
import {AudioRecorder, AudioUtils} from 'react-native-audio';

export default async function getPermissionAsync(permission) {
  const permissionName = permission.toLowerCase().replace('_', ' ');
  const granted = await PermissionsAndroid.request(permission);

  if (granted !== 'granted') {
    return false;
  }
  return true;
}

export async function getLocationAsync(onSend) {
  if (await getPermissionAsync(PermissionsAndroid.PERMISSIONS.LOCATION)) {
    const location = await Location.getCurrentPositionAsync({});
    if (location) {
      onSend([{location: location.coords}]);
    }
  }
}

export async function pickImageAsync(onSend) {
  console.log(
    'PermissionsAndroid.PERMISSIONS.CAMERA_ROLL: ',
    PermissionsAndroid.PERMISSIONS.CAMERA_ROLL,
  );
  // if (await getPermissionAsync(PermissionsAndroid.PERMISSIONS.CAMERA_ROLL)) {
  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //   });

  //   if (!result.cancelled) {
  //     onSend([{image: result.uri}]);
  //     return result.uri;
  //   }
  // }
}

export async function startRecordAsync() {
  if (
    await getPermissionAsync(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ) /* &&
    (await getPermissionAsync(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ) */
  ) {
    let audioPath =
      AudioUtils.DocumentDirectoryPath +
      `/${Math.floor(Math.random() * 1000000)}.mp3`;

    await AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: 'Low',
      AudioEncoding: 'mp3',
      AudioEncodingBitRate: 32000,
      IncludeBase64: true,
    }).then((result) => console.log('result: ', result));

    try {
      const filePath = await AudioRecorder.startRecording();
      AudioRecorder.onProgress = (data) => {
        console.log('current: ', data);
      };
      console.log('filePath: ', filePath);
    } catch (error) {
      console.error(error);
    }
  }
}

export async function stopRecordAsync(onSend) {
  if (await getPermissionAsync(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO)) {
    try {
      const filePath = await AudioRecorder.stopRecording();
      AudioRecorder.onFinished = (data) => {
        // Android callback comes in the form of a promise instead.
        // console.log('data: ', data);
        if (data.status === 'OK') {
          const messagesToUpload = [
            {
              _id: Math.round(Math.random() * 1000000),
              audio: data.audioFileURL,
              createdAt: new Date().getTime(),
              user: {
                _id: 1,
                name: 'React Native',
              },
            },
          ];

          onSend(messagesToUpload);
        }
      };
      return filePath;
    } catch (error) {
      console.error(error);
    }
  }
}

export async function takePictureAsync(onSend) {
  console.log('onSend: ', onSend);
  if (await getPermissionAsync(PermissionsAndroid.PERMISSIONS.CAMERA)) {
    const options = {
      title: 'Chọn Phương Thức',
      takePhotoButtonTitle: 'Máy Ảnh',
      chooseFromLibraryButtonTitle: 'Bộ Sưu Tập',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    await ImagePicker.showImagePicker(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // const source = {uri: response.uri};

        // You can also display the image using data:
        const messagesToUpload = [
          {
            _id: Math.round(Math.random() * 1000000),
            image: 'data:image/jpeg;base64,' + response.data,
            createdAt: new Date().getTime(),
            user: {
              _id: 1,
              name: 'React Native',
            },
          },
        ];

        await onSend(messagesToUpload);
        return response.data;
        // this.setState({
        //   avatarSource: source,
        // });
      }
    });
  }
}
