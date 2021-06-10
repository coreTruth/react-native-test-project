import * as React from 'react';
import { AntDesign } from '@expo/vector-icons';
import {
  Animated,
  Easing,
  Button,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import SortableList from 'react-native-sortable-list';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import DefaultAccounts from '../constants/Accounts';
import { Account } from '../types';
import DraggableList from '../components/DraggableList';

const window = Dimensions.get('window');

function AccountItem(props: any) {
  return (
    <View style={styles.accountItem}>
      <View>
        <Image source={{uri: props.avatar}} style={styles.avatar} />
        <View>
          <Text>{props.name}</Text>
          <Text>{props.balance}</Text>
        </View>
      </View>
    </View>
  )
}

function EditableAccountItem(props: any) {
  const _active = new Animated.Value(0);
 
  const _style = {
    ...Platform.select({
      ios: {
        transform: [{
          scale: _active.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.1],
          }),
        }],
        shadowRadius: _active.interpolate({
          inputRange: [0, 1],
          outputRange: [2, 10],
        }),
      },

      android: {
        transform: [{
          scale: _active.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.07],
          }),
        }],
        elevation: _active.interpolate({
          inputRange: [0, 1],
          outputRange: [2, 6],
        }),
      },
    })
  };

  React.useEffect(() => {
    Animated.timing(_active, {
      duration: 300,
      easing: Easing.bounce,
      toValue: Number(props.active),
      useNativeDriver: true
    }).start();
  }, [props.active])

  return (
    <Animated.View style={[
      styles.accountItem,
      _style,
    ]}>
      <View>
        <Image source={{uri: props.avatar}} style={styles.avatar} />
        <View>
          <Text>{props.name}</Text>
          <Text>{props.balance}</Text>
        </View>
      </View>
      <AntDesign size={30} name="bells" color="grey" />
    </Animated.View>
  )
}

const _renderRow = (props: any) => {
  return <EditableAccountItem data={props.data} active={props.active} style={{}} />
}

function AccountList(props: JSX.IntrinsicAttributes & { data: Account[]; onChangeList?: any; }) {
  const checkEditMode = props.onChangeList !== undefined;
  const [accounts, setAccounts] = React.useState(props.data);

  function saveAccounts() {
    props.onChangeList(accounts)
  }

  return (
    <View style={styles.accountList}>
      {!checkEditMode && props.data.map((value: Account, index: number) => <AccountItem key={index} {...value} />)}
      {checkEditMode && (
        <View>
          <DraggableList />
          {/* <SortableList
            style={styles.list}
            contentContainerStyle={styles.contentContainer}
            data={props.data}
            renderRow={_renderRow} /> */}
          <Button title="Save" onPress={saveAccounts} />
        </View>
      )}
    </View>
  )
}

function ListView(props: JSX.IntrinsicAttributes & { data: Account[]; onPressEdit: any; }) {
  return (
    <View style={styles.container}>
      <View style={{padding: 20}}>
        <Text style={styles.title}>Accounts</Text>
        <AccountList {...props} />
      </View>
      <DraggableList />
      <Button title="Edit home" onPress={props.onPressEdit} />
    </View>
  )
}

function EditView(props: JSX.IntrinsicAttributes & { data: Account[]; onChangeList: any; }) {
  return (
    <View style={styles.container}>
      <View style={{padding: 20}}>
        <Text style={styles.title}>Accounts</Text>
        <AccountList {...props} />
        <DraggableList />
      </View>
    </View>
  )
}

function Header() {
  const colorScheme = useColorScheme();
 
  return (
    <View style={styles.homeNavigation}>
      <AntDesign size={20} style={styles.userIcon} name="user" color={Colors[colorScheme].tint} />
      <AntDesign size={20} style={styles.bellIcon} name="bells" color={Colors[colorScheme].tint} />
    </View>
  );
}

export default function HomeTabScreen() {
  const [viewStatus, setViewStatus] = React.useState('view');
  const [accountList, setAccountList] = React.useState(DefaultAccounts)

  return (
    <View style={{height: '100%'}}>
      {viewStatus === 'view' && <ListView data={accountList} onPressEdit={() => setViewStatus('edit')} />}
      {viewStatus === 'edit' && <EditView data={accountList} onChangeList={(list: Account[]) => {
        setAccountList(list)
        setViewStatus('view')
      }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    height: '100%'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  homeNavigation: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    maxHeight: 60,
    marginHorizontal: 20,
    paddingBottom: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  userIcon: {
    marginTop: 20,
  },
  bellIcon: {
    marginTop: 5
  },
  accountList: {
    flex: 1,
    paddingBottom: 20,
    borderBottomColor: "rgba(0,0,0,0.1)", 
    borderBottomWidth: 1
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 30,
    borderRadius: 25,
  },
  list: {
    flex: 1,
  },

  contentContainer: {
    width: window.width,

    ...Platform.select({
      ios: {
        paddingHorizontal: 30,
      },

      android: {
        paddingHorizontal: 0,
      }
    })
  },

  accountItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    height: 80,
    flex: 1,
    marginTop: 7,
    marginBottom: 12,
    borderRadius: 4,


    ...Platform.select({
      ios: {
        width: window.width - 30 * 2,
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOpacity: 1,
        shadowOffset: {height: 2, width: 2},
        shadowRadius: 2,
      },

      android: {
        width: window.width - 30 * 2,
        elevation: 0,
        marginHorizontal: 30,
      },
    })
  },
});
