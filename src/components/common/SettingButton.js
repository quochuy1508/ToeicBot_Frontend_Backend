import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SettingButton({name, onPress}) {
    let icon, text;
    switch(name) {
        case 'feedback':
            icon = 'mail';
            text = 'Send Feedback';
            break;
        case 'rate':
            icon = 'star-half-sharp';
            text = 'Rate Us';
            break;
        case 'like':
            icon = 'logo-facebook';
            text = 'Like us on Facebook';
            break;
        case 'logout':
            icon = 'log-out';
            text = 'Log Out';
            break;
    }
    return(
        <TouchableOpacity style={styles.container} delayPressIn={0} onPress={onPress}>
            <Icon name={icon} size={24} color="gray" style={styles.icon} />
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'gainsboro'
    },
    icon: {
        margin: 15
    },
    text: {
        fontSize: 16
    }
})