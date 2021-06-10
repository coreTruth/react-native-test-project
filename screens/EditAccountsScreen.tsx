import * as React from 'react';
import { AntDesign } from '@expo/vector-icons';
import {
  StyleSheet,
} from 'react-native';

import { Text, View } from '../components/Themed';
import EditableAccountList from '../components/EditableAccountList';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function EditAccountsScreen(props: any) {
  const [data, setData] = React.useState(props.route.params.data)

  const save = () => {
    props.navigation.navigate('HomeTabScreen', { updatedData: data })
  }

  return (
    <View style={styles.betweenContainer}>
      <View style={styles.container}>
        <View style={styles.subTitle}>
          <Text style={styles.subTitleText}>Accounts</Text>
          <AntDesign name="right" />
        </View>
        <EditableAccountList data={data} setData={setData} />
      </View>
      <View style={styles.saveButtonWrapper} >
        <TouchableOpacity style={styles.saveButton} onPress={save}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  betweenContainer: {
    justifyContent: 'space-between',
    height: '100%'
  },
  container: {
    padding: 20,
    flex: 1
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
  saveButtonWrapper: {
    // position: 'absolute',
    width: '100%',
    bottom: 0,
    paddingTop: 20,
    paddingBottom: 5,
    borderTopColor: '#d8d8d8',
    borderTopWidth: 8
  },
  saveButton: {
    borderRadius: 10,
    backgroundColor: 'rgb(102, 102, 255)',
    paddingVertical: 5,
    margin: 10
  },
  saveButtonText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  }
});
