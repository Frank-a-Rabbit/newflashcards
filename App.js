import "react-native-gesture-handler"
import React from "react"
import {StyleSheet, Text, View, TouchableOpacity} from "react-native"
import {NavigationContainer} from "@react-navigation/native"
import {createDrawerNavigator} from "@react-navigation/drawer"
import Decks from "./components/Decks"
import ViewDeck from "./components/ViewDeck"

const Drawer = createDrawerNavigator();

const App = () => {
    
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
    marginTop: 100,
    marginBottom: "auto",
    width: "100%",
    zIndex: 100
  },
  navFont: {
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