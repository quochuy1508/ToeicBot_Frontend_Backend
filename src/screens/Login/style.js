import { StyleSheet, Dimensions } from 'react-native';

let width = Dimensions.get('window').width;

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
   supportContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 100,
   },
   support: {
    color: 'deepskyblue',
   },
   signUpContainer: {
    flexDirection: 'row', 
    backgroundColor: 'whitesmoke', 
    height: 50, 
    width: width,
    alignItems: 'center', 
    justifyContent: 'center', 
    position: 'absolute', 
    bottom: 0,
   },
   signUp: {
    color: 'deepskyblue', 
    textDecorationLine: 'underline',
   }
});

export default styles;
