import "react-native-gesture-handler"
import React, {Component, useState, useEffect, useCallback} from "react"
import {Platform, StyleSheet, Text, View, TouchableOpacity} from "react-native"
import {NavigationContainer} from "@react-navigation/native"
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem} from "@react-navigation/drawer"
import {createStackNavigator} from "@react-navigation/stack"
import Decks from "./components/Decks"
import ViewDeck from "./components/ViewDeck"
import AsyncStorage from "@react-native-community/async-storage"
import { useFonts, DoHyeon_400Regular } from "@expo-google-fonts/do-hyeon"

const Drawer = createDrawerNavigator();

const App = () => {
    let [fontsLoaded] = useFonts({
      DoHyeon_400Regular,
    });
    
    return(
      <View style={styles.parent}>
        <NavigationContainer>
          <PrimaryNav></PrimaryNav>  
        </NavigationContainer>  
      </View>      
    )
};

export function PrimaryNavOpen({navigation}){
  return(
    <View style={[styles.navBtn, styles.shadow]}>
      <TouchableOpacity title="Open drawer" onPress={() => navigation.openDrawer()}>
        <Text style={styles.navFont}>Open Navigation</Text>
      </TouchableOpacity>
    </View>
  )
};

function PrimaryNav(){
  return(
    <Drawer.Navigator>
      <Drawer.Screen name="Decks" component={Decks}></Drawer.Screen>
      <Drawer.Screen name="ViewDeck" component={ViewDeck} options={{drawerLabel: () => null}}></Drawer.Screen>
    </Drawer.Navigator>
  )
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    position: "relative"
  },
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
    position: "absolute",
    top: 0,
    left: 0,
    padding: 15,
    backgroundColor: "red",
    color: "white",
    textAlign: "center",
    marginBottom: "auto",
    width: "100%"
  },
  navFont: {
    fontFamily: "DoHyeon_400Regular",
    fontSize: 22,
    color: "azure"
  },
  shadow: {
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2 
  }
});

export default App