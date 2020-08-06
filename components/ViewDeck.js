import React, {Component} from "react"
import {StyleSheet, View, Text} from "react-native"
import DeckItem from "./DeckItem"
import {PrimaryNavOpen} from "../App"

class ViewDeck extends Component{
    constructor(props){
        super(props);
    }

    static navigationOptions = {
        drawerLabel: () => null
    }
    
    render(){
        const props = this.props;
        return(
            <View style={{flex: 1}}>
                <PrimaryNavOpen navigation={props.navigation}></PrimaryNavOpen>
                <View style={styles.container}>
                    <DeckItem props={props}></DeckItem>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "stretch",
        backgroundColor: "#F5FCFF",
        position: "relative",
        zIndex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderColor: "green",
        borderWidth: 2,
        marginTop: 50
    },
    fontColor: {
        color: "black"
    },
    title: {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        padding: 15,
        textAlign: "center",
        fontSize: 28,
        fontWeight: "bold"
    },
    list: {
        padding: 15
    },
    deck: {
        padding: 15,
        flex: 1,
        alignSelf: "stretch",
        fontSize: 14,
        lineHeight: 14
    },
    deckCont: {
        borderStyle: "solid",
        borderColor: "red",
        borderWidth: 1,
        marginBottom: 25,
        justifyContent: "space-around",
        flexDirection: "row"
    },
    deckTitle: {
        fontSize: 22,
        fontWeight: "600"
    }
  });

export default ViewDeck