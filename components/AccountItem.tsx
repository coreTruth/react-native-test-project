import { AntDesign } from '@expo/vector-icons';
import * as React from 'react';
import { Image, StyleSheet } from 'react-native';

import { View, Text } from '../components/Themed';

export default function AccountItem(props: any) {
  return (
    <View style={styles.accountItem}>
      <View style={styles.accountItemInfo}>
        <Image source={{uri: props.data.avatar, width: 30, height: 30}} style={styles.avatar} />
        <View style={{marginLeft: 10}}>
          <Text style={{fontSize: 12}}>{props.data.name}</Text>
          <Text style={{fontSize: 12}}>Balance {props.data.balance}</Text>
        </View>
      </View>
      <View>
        {props.draggable && <AntDesign name="menuunfold" />}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  accountItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5
  },
  accountItemInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  avatar: {
    borderRadius: 9999
  }
});
