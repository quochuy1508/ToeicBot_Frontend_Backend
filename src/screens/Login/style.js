import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
   buttonContainer: {
    marginTop: 50, 
    marginBottom: 10,
    alignItems: 'center',
   },
   author: {
     color: 'gray',
     fontSize: 15,
     position: 'absolute',
     bottom: 0,
     marginBottom: 20,
   }
});

export default styles;
