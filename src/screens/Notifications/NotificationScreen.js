import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';

export default function NotificationScreen() {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Bạn không có thông báo nào!</Text>
        </View>
    )
}