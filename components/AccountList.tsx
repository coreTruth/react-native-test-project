import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import AccountItem from './AccountItem';

export default function AccountList(props: any) {
  return (
    <View style={styles.accountList}>
      {props.data.map((data: any, index: number) => <AccountItem key={index} data={data} />)}
    </View>
  )
}

const styles = StyleSheet.create({
  accountList: {
  }
});
