import React from "react"
import {Platform, StyleSheet, Text, View} from "react-native"

export default class App extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      
        <View style={{backgroundColor : "red", padding: 25}}>
          <Text style={styles.instructions}>I will overcome big time baby buns booty</Text>
        </View>
      
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
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
  }
});
