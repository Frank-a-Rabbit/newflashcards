import "react-native-gesture-handler"
import React from "react"
import {Platform, StyleSheet, Text, View, TouchableOpacity} from "react-native"
import {NavigationContainer} from "@react-navigation/native"
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem} from "@react-navigation/drawer"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import Decks from "./components/Decks"
import Deck from "./components/Deck"

const Drawer = createDrawerNavigator();

export default class App extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <View style={{flex: 1, backgroundColor: "azure"}}>
        <NavigationContainer>
          <PrimaryNav style={{flex: 1, backgroundColor: "azure"}}></PrimaryNav>
        </NavigationContainer>
      </View>      
    )
  }
};

function PrimaryNavToggle({navigation}){
  return(
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity title="Open drawer" onPress={() => navigation.openDrawer()}>
        <Text>Open</Text>
      </TouchableOpacity>
      <TouchableOpacity title="Toggle drawer" onPress={() => navigation.closeDrawer()}>
        <Text>Close</Text>
      </TouchableOpacity>
    </View>
  )
}

function PrimaryNav(){
  return(
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="PrimaryNavToggle" component={PrimaryNavToggle}></Drawer.Screen>
    </Drawer.Navigator>
  )
}

function DrawerContent(props){
  console.log(props, "props");
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.toggleDrawer()}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    position: "relative"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginTop: 55,
  },
  fontColor: {
    color: "black"
  },
  navBtn: {
    padding: 15,
    backgroundColor: "red",
    color: "white",
    textAlign: "center"
  }
});
