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
      width: 70, 
      height: 70, 
      borderRadius: 35, 
    },
    name: {
      color: 'white', 
      fontWeight: 'bold', 
      fontSize: 18
    },
    text: {
      alignItems: 'center',
      margin: 10,
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