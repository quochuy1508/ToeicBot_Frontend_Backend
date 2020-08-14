import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white' 
    },
    buttonContainer: {
      flexDirection: 'row', 
      flex: 1, 
      justifyContent:'space-around'
    },
    text: {
      marginTop: 20,
      marginLeft: 10,
      fontSize: 15,
    }
  });

  export default styles;