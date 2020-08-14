import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function ProfileButton({name, active, onPress}) {
    const styles = StyleSheet.create({
        button: {
            width: 300,
            height: 45,
            backgroundColor: active ? 'mediumblue' : 'whitesmoke',
            margin: 10,
            borderRadius: 2,
            alignItems: 'center',
            justifyContent: 'center',
        },
        text: {
            color: active ? 'white' : 'gray'
        }
    })
    return(
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{name}+</Text>
        </TouchableOpacity>
    )
}