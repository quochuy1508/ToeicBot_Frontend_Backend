import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SettingButton({name, onPress}) {
    let icon, text;
    switch(name) {
        case 'feedback':
            icon = 'mail';
            text = 'Gửi ý kiến phản hồi';
            break;
        case 'rate':
            icon = 'star-half-sharp';
            text = 'Đánh giá ToeicBot trên CH Play';
            break;
        case 'like':
            icon = 'logo-facebook';
            text = 'Like trang Facebook của ToeicBot';
            break;
        case 'share':
            icon = 'arrow-redo';
            text = 'Chia sẻ với bạn bè của bạn';
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
        borderBottomColor: 'gainsboro',
    },
    icon: {
        margin: 20
    },
    text: {
        fontSize: 15
    }
})