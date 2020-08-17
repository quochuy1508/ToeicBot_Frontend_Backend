import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white', 
    },
    info: {
      flex: 3, 
      alignItems: 'center',
      backgroundColor: 'mediumblue',
    },
    avt: {
      width: 75, 
      height: 75, 
      borderRadius: 38, 
    },
    name: {
      color: 'white', 
      fontWeight: 'bold', 
      fontSize: 18
    },
    text: {
      alignItems: 'center',
      margin: 15,
    },
    level :{
      flex: 1, 
      backgroundColor: 'mediumblue', 
      alignItems: 'center', 
      justifyContent: 'center',
      flexDirection: 'row',
    }
  });

  export default styles;