import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Platform, Animated, PanResponder } from "react-native";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import { PanGestureHandler } from "react-native-gesture-handler";
import { Account } from "../types";
import AccountItem from "./AccountItem";

export default function EditableAccountList(props: any) {
  const [remove, setRemove] = React.useState(false)
  const [dragged, setDragged] = React.useState(false)
  const [rzPositionY, setRzPositionY] = React.useState(0)
  const [y, sy] = React.useState(0)
  const refRemoveZone = React.useRef(null)

  const renderItem = React.useCallback(
    ({ item, index, drag, isActive }: RenderItemParams<Account>) => {
      return (
        <TouchableOpacity
          style={{
            borderColor: isActive ? "red" : "none",
            borderWidth: isActive ? 1 : 0
          }}
          onPressIn={drag}
        >
          <AccountItem data={item} draggable={true} />
        </TouchableOpacity>
      );
    },
    []
  );

  const onDragEnd = (res: any) => {
    let updatedData = res.data
    if (remove && dragged) {
      updatedData.splice(res.to, 1)
    }
    props.setData(updatedData);
    setRemove(false)
  }

  React.useEffect(() => {
    refRemoveZone.current.measureInWindow((x, y, width, height) => {
      setRzPositionY(y)
    })
  }, [props.data])

  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
        console.log("---", evt, gestureState)
        sy(gestureState.y0)
        if (gestureState.y0 > rzPositionY + 20 && gestureState.y0 < rzPositionY + 50) {
          setRemove(true)
        } else {
          setRemove(false)
        }
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      }
    })
  ).current;
    
  return (
    <Animated.View style={styles.container} 
      onMoveShouldSetResponder={(evt) => true}
      onResponderMove={(evt) => {
        sy(evt.nativeEvent.pageY)
        if (evt.nativeEvent.pageY > rzPositionY + 20 && evt.nativeEvent.pageY < rzPositionY + 50) {
          setRemove(true)
        } else {
          setRemove(false)
        }
      }}
      >
      <DraggableFlatList
        containerStyle={styles.draggableContainer}
        data={props.data}
        renderItem={renderItem}
        keyExtractor={(item, index) => `draggable-item-${index}`}
        onDragEnd={(res) => { setDragged(false), onDragEnd(res) }}
        onDragBegin={(res) => setDragged(true)}
        dragItemOverflow={true}
      />
      <View style={{marginTop: 5}}>
        <Text style={{fontSize: 10}}>Remove from Home{rzPositionY}|{y}</Text>
        <View ref={refRemoveZone} nativeID="removeZone" style={[styles.removeZone, {borderWidth: remove ? 3 : 0}]}>
          <AntDesign name="minussquare" />
          <Text style={{marginLeft: 5}}>Drag here to make it invisible</Text>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  draggableContainer: {
    zIndex: 2,
    
    ...Platform.select({
      ios: {
        flex: 0
      },

      android: {
        flex: 0
      }
    })
  },
  removeZone: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: 'grey',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5
  }
});
