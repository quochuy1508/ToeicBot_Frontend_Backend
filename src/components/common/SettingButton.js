import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Linking, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SettingButton({name}) {
    let icon, text, url;
    switch(name) {
        case 'feedback':
            icon = 'mail';
            text = 'Gửi ý kiến phản hồi';
            url = 'mailto:toeicbottlp@gmail.com?subject=Phản hồi';
            var onPress = () => {
                Linking.canOpenURL(url).then(supported => {
                    if (supported) {
                      Linking.openURL(url);
                    } else {
                      Alert.alert("Phản hồi", "Vui lòng gửi ý kiến phản hồi của bạn về địa chỉ email: toeicbottlp@gmail.com");
                    }
                });
            }
            break;
        case 'rate':
            icon = 'star-half-sharp';
            text = 'Đánh giá ToeicBot trên CH Play';
            url = 'market://details?id=com.whatsapp';
            var onPress = () => {
                Alert.alert(
                    'ToeicBot có giúp bạn tiến bộ trong Toeic?',
                    'Đánh giá ứng dụng ToeicBot 5 sao nhé!',
                    [
                        {text: 'Để sau'},
                        {
                          text: 'Không, cảm ơn',
                          style: 'cancel'
                        },
                        { 
                          text: 'Chắc chắn rồi!', 
                          onPress: () => Linking.canOpenURL(url).then(supported => {
                            if(supported) {
                                Linking.openURL(url);
                            } else {
                                Linking.openURL('https://play.google.com/store/apps/details?id=com.whatsapp');
                            }
                        }) }
                    ],
                    {cancelable: true}
                )
            }
            break;
        case 'like':
            icon = 'logo-facebook';
            text = 'Like trang Facebook của ToeicBot';
            url = 'fb://page/105433024609475';
            var onPress = () => {
                Linking.canOpenURL(url).then(supported => {
                    if (supported) {
                      Linking.openURL(url);
                    } else {
                      Linking.openURL('https://www.facebook.com/BotStudy-105433024609475/');
                    }
                });
            }
            break;
        case 'share':
            icon = 'arrow-redo';
            text = 'Chia sẻ với bạn bè của bạn';
            url = 'https://www.facebook.com/sharer/sharer.php?u='
                  + encodeURI('https://play.google.com/store/apps/details?id=com.whatsapp') 
                  + '&quote=' 
                  + encodeURI('Xin chào mọi người! Đây là một ứng dụng rất hay để học Toeic cùng Chatbot. Hãy tham gia cùng mình nhé!');
            const url2 = "fb://faceweb/f?href=" + url;
            var onPress = () => {
                Linking.canOpenURL(url2).then((supported) => {
                    if (supported) {
                      Linking.openURL(url2);
                    } else {
                      Linking.openURL(url);
                    }
                });
            }
            break;
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