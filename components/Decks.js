import React, {Component} from "react"
import {Platform, StyleSheet, Text, View, TouchableOpacity} from "react-native"
import DATA from "../utils/data"
import AsyncStorage from "@react-native-community/async-storage"

export default class Decks extends Component{
    constructor(props){
        super(props);
    }

    state = {
        decks: ""
    }

    componentDidMount(){
        let decks;
        AsyncStorage.getItem("DECKS", (err, result) => {
            if(err){
                console.log(err);
            }else{
                console.log(result)
                decks = JSON.parse(result);
            }
        }).then(() => {
            this.setState({
                decks: decks
            });
        })
    }

    render(){
        const navigation = this.props.navigation;
        return(
            <View style={styles.container}>
                <Text>Decks for your Ass Alyssa</Text>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
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