import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';

export default function NotificationScreen() {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>You have no notification!</Text>
        </View>
    )
}