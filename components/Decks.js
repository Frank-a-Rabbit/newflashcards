import React, {Component} from "react"
import {TextInput, StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, Button} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {PrimaryNavOpen} from "../App"
import DATA from "../utils/data"

class Decks extends Component{
    constructor(props){
        super(props);
        this.updateState = this.updateState.bind(this);
        this.state = {
            decks: {},
            hasDecks: false,
            addNewDeck: false,
            deckItems: [],
            notify: false,
            navToDeck: null
        }
    }

    _isMounted = false;
    componentDidMount(){
        this._isMounted = true;
        (async() => {
            let resp = await DATA._getNotification();
            if(resp === false){
                this.setState({notify: true});
            }
        })();
        let decks;
        AsyncStorage.getItem("DECKS", (err, result) => {
            if(err){
                console.log(err);
            }
            if(result === null){
                DATA._seed().then(async() => {
                    let decks = await AsyncStorage.getItem("DECKS");
                    decks = JSON.parse(decks);
                    this.setState({
                        decks: decks,
                        hasDecks: true
                    });
                });
            }else{
                let decks = JSON.parse(result);
                this.setState({
                    decks: decks,
                    hasDecks: true
                });
            }
        });
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    updateState = (resp) => {
        let currentDecks = this.state.decks;
        currentDecks[resp.title].questions = resp.questions;
        this.setState({decks : currentDecks});
    }

    render(){
        const navigation = this.props.navigation;
        let allItems = [];
        let title;
        const addNewDeckItem = () => {
            this.setState({addNewDeck: true});
        }

        const Deck = ({deck}) => {
            if(this.state.navToDeck){
                if(deck.title === this.state.navToDeck){
                    deck.nav.navigate("ViewDeck", {deckName: deck.title, questions: deck.questions, updater: deck.updateFunction})
                }
            }
            return(
                <TouchableOpacity style={styles.deckCont} onPress={() => deck.nav.navigate("ViewDeck", {deckName: deck.title, questions: deck.questions, updater: deck.updateFunction})}>
                    <Text style={[styles.deck, styles.deckTitle]}>{deck.title}</Text>
                    <Text style={styles.deck}>Number of Cards: {this.state.decks[deck.title].questions.length}</Text>
                </TouchableOpacity>
            )
        }

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
                        currentItem["updateFunction"] = this.updateState
                    }
                });
                allItems.push(currentItem);

                if(idx == Object.keys(this.state.decks).length - 1){
                    this.state.deckItems = allItems;
                }
            })
        )}

        return(
            <View style={styles.container}>
                {this.state.notify && (
                    <View
                    style={styles.notification}>
                        <Button
                        style={styles.takeQuizBtn}
                        title="Close"
                        onPress={() => this.setState({notify: false})}>
                        </Button>
                        <Text style={styles.takeQuizTitle}>You Need to Take a Quiz Today</Text>
                    </View>
                )}
                <PrimaryNavOpen navigation={navigation}></PrimaryNavOpen>
                <SafeAreaView>
                    <FlatList
                        data={this.state.deckItems}
                        renderItem={renderItem}
                        keyExtractor={(renderItem, index) => index.toString()}>
                    </FlatList>
                </SafeAreaView>
                <Button
                    title="Add New Deck"
                    style={styles.newDeckBtn}
                    onPress={() => addNewDeckItem()}
                ></Button>
                <Text style={styles.title}>All Decks</Text>
                {this.state.addNewDeck && (
                    <View style={styles.addDeck}>
                        <TextInput
                        style={styles.input}
                        placeholder="Deck Title:"
                        onChangeText={value => title = value}
                        ></TextInput>
                        <Button
                            title="Add New Deck"
                            onPress={async () => {
                                await DATA._addDeck(title).then(() => {
                                    let decks = async () => {
                                        await DATA._getDecks().then((data) => {
                                            JSON.stringify(data);
                                            this.setState({
                                                decks: data,
                                                addNewDeck: false
                                            });
                                            this.setState({navToDeck: title});
                                        });
                                    }
                                    decks();
                                })
                            }}
                        ></Button>
                    </View>
                )}
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
    },
    addDeck: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2,
        backgroundColor: "white"
    },
    input: {
        marginTop: 15,
        marginBottom: 15,
        padding: 10,
        borderWidth: 1,
        borderColor: "black"
    },
    notification: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
        backgroundColor: "white"
    },
    takeQuizTitle: {
        marginBottom: 350
    }, 
    takeQuizBtn: {
        position: "absolute",
        top: 25,
        right: 25
    }
  });

  export default Decks;