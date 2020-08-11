import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1, 
    },
    info: {
      flex: 1, 
      flexDirection: 'row', 
      alignItems: 'center',
      resizeMode: 'cover',
      backgroundColor: 'blue',
    },
    avt: {
      width: 75, 
      height: 75, 
      borderRadius: 38, 
      margin: 20
    },
    name: {
      color: 'white', 
      fontWeight: 'bold', 
      fontSize: 18
    },
  });

  export default styles;