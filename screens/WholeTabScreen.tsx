import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';

export default function WholeTabScreen({ navigation }: any) {
  const moveToHomeTab = () => {
    navigation.navigate('HomeTabScreen')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recently Added</Text>
      <View style={styles.menu}>
        <Text style={styles.menuText} onPress={moveToHomeTab}>Accounts</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: '100%'
  },
  title: {
    fontSize: 20,
    borderBottomWidth: 1,
    paddingBottom: 5
  },
  menu: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 20,
    height: 1,
    width: '80%'
  },
  menuText: {
    color: Colors.light.tint
  }
});
