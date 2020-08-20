import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SettingButton({name}) {
    let icon, text, url;
    switch(name) {
        case 'feedback':
            icon = 'mail';
            text = 'Gửi ý kiến phản hồi';
            url = 'mailto:toeicbottlp@gmail.com?subject=Phản hồi';
            break;
        case 'rate':
            icon = 'star-half-sharp';
            text = 'Đánh giá ToeicBot trên CH Play';
            url = ' ';
            break;
        case 'like':
            icon = 'logo-facebook';
            text = 'Like trang Facebook của ToeicBot';
            url = 'fb://page/105433024609475';
            break;
        case 'share':
            icon = 'arrow-redo';
            text = 'Chia sẻ với bạn bè của bạn';
            url = ' ';
            break;
    }
    const onPress = () => {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
              Linking.openURL(url);
            } else {
              console.log(`Don't know how to open URL: ${url}`);
            }
          });
    }
    return(
        <TouchableOpacity style={styles.container} delayPressIn={0} onPress={() => onPress()}>
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
        borderBottomColor: 'gainsboro',
    },
    icon: {
        margin: 20
    },
    text: {
        fontSize: 15
    }
})