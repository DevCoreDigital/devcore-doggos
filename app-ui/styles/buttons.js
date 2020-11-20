import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  whiteBtn: {
    marginTop: 10,
    marginBottom: -10,
    backgroundColor: 'white',
    width: 195,
    alignSelf: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 2,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1
  },
  whiteBtnText: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#767676',
    fontSize: 14
  }
});

export default styles;
