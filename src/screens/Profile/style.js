import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white', 
    },
    info: {
      flex: 4,
      flexDirection: 'row',
      alignItems: 'center',
    },
    bar: {
      flex: 1, 
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: 'gainsboro'
    },
    logout: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    avt: {
      width: 60,
      height: 60,
      borderRadius: 30,
      margin: 20,
    },
    text: {
      height: 60,
    }
  });

  export default styles;