import React from 'react';
import {Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

export default function NavButton({name, navigation, uri}) {
    let img, text;
    if(name === 'Chatbot') {
        img = require('../../assets/logo.png');
        text = 'Chat with Bot'
    }
    else if(name === 'Profile') {
        img = {uri: uri };
        text = 'Go to Profile';
    }
    else {
        img = {uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTnZ1FCCJbLKKDr8rBZjWPhfc4FjDcjuFC3Xw&usqp=CAU'};
        text = 'Go to Menu';
    }
    return(
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(name)} delayPressIn={0}>
            <Image source={img} style={styles.image}/>
            <Text>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        backgroundColor: 'white',
        borderRadius: 5,
        alignItems: 'center',
        width: 100,
        height: 120,
        margin: 10
    },
    image: {
        width: 90, 
        height: 50, 
        margin: 10,
        borderRadius: 5,
    }
})