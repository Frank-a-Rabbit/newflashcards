import React, {Component, useState} from "react"
import {Platform, StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity} from "react-native"
import AsyncStorage from "@react-native-community/async-storage"
import {PrimaryNavOpen} from "../App"
import {createStackNavigator} from "@react-navigation/stack"
// import Deck from "./Deck"
import DATA from "../utils/data"

const Stack = createStackNavigator();

const Deck = ({deck}) => {
    return(
        <TouchableOpacity style={styles.deckCont} onPress={() => deck.nav.navigate("ViewDeck", {deckName: deck.title, questions: deck.questions})}>
            <Text style={[styles.deck, styles.deckTitle]}>{deck.title}</Text>
            <Text style={styles.deck}>Number of Cards: {deck.count}</Text>
        </TouchableOpacity>
    )
}

export default class Decks extends Component{
    constructor(props){
        super(props);
    }

    state = {
        decks: {},
        hasDecks: false
    }

    componentDidMount(){
        let decks;
        AsyncStorage.getItem("DECKS", (err, result) => {
            if(err){
                console.log(err);
            }else{
                if(result === null){
                    DATA._seed().then(() => {
                        this.setState({
                            decks: decks,
                            hasDecks: true
                        });
                    });
                }
                decks = JSON.parse(result);
            }
        }).then(() => {
            this.setState({
                decks: decks,
                hasDecks: true
            });
            console.log(this.state.decks)
        })
    }

    render(){
        const navigation = this.props.navigation;
        let allItems = [];
        const renderItem = ({item}) => {
            return(
                <Deck
                    deck={item}
                ></Deck>
            )
        }
        {this.state.hasDecks && (
            Object.keys(this.state.decks).map((key, idx) => {
                let currentItem = {}
                Object.values(this.state.decks[key]).map((item) => {
                    currentItem["nav"] = navigation;
                    if(typeof item === "string"){
                        currentItem["title"] = item
                    }else if(typeof item === "object"){
                        currentItem["count"] = item.length
                        currentItem["questions"] = item
                    }
                })
                allItems.push(currentItem)
                console.log(allItems)
            })
        )}

        return(
            <View style={styles.container}>
                <PrimaryNavOpen navigation={navigation}></PrimaryNavOpen>
                <SafeAreaView>
                    <FlatList
                        data={allItems}
                        renderItem={renderItem}>
                    </FlatList>
                </SafeAreaView>
                <Text style={styles.title}>All Decks</Text>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "stretch",
        backgroundColor: "#F5FCFF",
        position: "relative",
        zIndex: 1,
        paddingLeft: 15,
        paddingRight: 15
    },
    fontColor: {
        color: "black"
    },
    navBtn: {
        padding: 15,
        backgroundColor: "red",
        color: "white",
        textAlign: "center"
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

//   export default function(props){
//       const navigation = useNavigation();
//       return <Decks {...props} navigation={navigation}></Decks>
//   }