import * as React from 'react';
import {View} from 'react-native';
import styles from './styles';
import Button from '../../components/common/SettingButton';
import Logout from '../../components/logout';

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Button name='feedback'/>
      <Button name='rate'/>
      <Button name='like'/>
      <Logout />
      <View style={{flex: 9}}></View>
    </View>
  );
}

export default SettingsScreen;
