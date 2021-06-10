import * as React from 'react';
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

export default function Header() {
  const colorScheme = useColorScheme();
 
  return (
    <View style={styles.header}>
      <AntDesign size={20} style={styles.headerUserIcon} name="user" color={Colors[colorScheme].tint} />
      <AntDesign size={20} style={styles.headerBellIcon} name="bells" color={Colors[colorScheme].tint} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerUserIcon: {
    marginTop: 20,
  },
  headerBellIcon: {
    marginTop: 5
  }
});
