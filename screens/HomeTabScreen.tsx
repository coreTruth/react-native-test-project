import * as React from 'react';
import { AntDesign } from '@expo/vector-icons';
import {
  Button,
  StyleSheet,
} from 'react-native';

import { Text, View } from '../components/Themed';
import DefaultAccounts from '../constants/Accounts';
import AccountList from '../components/AccountList';

export default function HomeTabScreen(props: any) {
  const [data, setData] = React.useState(DefaultAccounts)

  React.useEffect(() => {
    if (props.route.params && props.route.params.updatedData !== undefined) {
      setData(props.route.params.updatedData)
    }
  }, [props.route.params])

  const moveToEditAccounts = () => {
    props.navigation.navigate('EditAccounts', { screen: 'EditAccountsScreen', params: {data} })
  }

  return (
    <View style={{height: '100%'}}>
      <View style={styles.container}>
        <View style={styles.subTitle}>
          <Text style={styles.subTitleText}>Accounts</Text>
          <AntDesign name="right" />
        </View>
        <AccountList data={data} />
      </View>
      <View style={styles.editButton} >
        <Button color="grey" onPress={moveToEditAccounts} title="Edit home" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: '100%'
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  subTitleText: {
    fontSize: 20,
  },
  editButton: {
    position: 'absolute',
    width: '100%',
    bottom: 0
  }
});
