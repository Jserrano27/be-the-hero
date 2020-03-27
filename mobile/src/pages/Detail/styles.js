import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  incident: {
    marginTop: 48,
    backgroundColor: '#fff',
    padding: 24,
    marginBottom: 16,
    borderRadius: 8
  },

  incidentProperty: {
    fontSize: 14,
    color: '#41414d',
    fontWeight: 'bold',
    marginTop: 24,
  },

  incidentValue: {
    marginTop: 8,
    fontSize: 15,
    color: '#737380'
  },

  contactBox: {
    backgroundColor: '#fff',
    padding: 24,
    marginBottom: 16,
    borderRadius: 8
  },

  heroTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 30,
    color: '#13131a'
  },

  heroDescription: {
    marginTop: 16,
    fontSize: 15,
    color: '#737380'
  },

  actions: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  action: {
    backgroundColor: "#E02041",
    borderRadius: 8,
    height: 50,
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  actionText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15
  }

});

export default styles;