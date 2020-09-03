import React, {Component, useEffect} from "react"
import {Text, Button, StyleSheet, Animated, View, TextInput, Keyboard} from "react-native"
import { Dimensions } from "react-native"
import DATA from "../utils/data"

class DeckItem extends Component{
    constructor(props){
        console.log(props)
        super(props);
        this.state = {
            opacity: new Animated.Value(0),
            addCard: false,
            deckItems: props.props.route.params.questions.length
        }
    }

    componentDidMount(){
        const {opacity} = this.state;
        Animated.timing(opacity, {toValue: 1, duration: 2500}).start();
    }

    render(){
        const props = this.props.props;
        const {opacity} = this.state;
        let question, answer;

        const addCard = () => {
            this.setState({addCard: true});
        }

        const addToDeck = () => {
            if(question === undefined || answer === undefined){
                return;
            }
            DATA._addCard(props.route.params.deckName, question, answer).then( _ => {
                DATA._getDecks("DECKS").then(response => {
                    this.setState({
                        addCard: false,
                        deckItems: response[props.route.params.deckName].questions.length
                    });
                });
                // this.setState({
                //     addCard: false,
                //     deckItems: deckLength
                // });
            });
        }

        return(
            <View style={styles.container}>
                <Animated.View style={[styles.innerCont, {opacity}]}>
                    <Text style={styles.title}>{props.route.params.deckName}</Text>
                    <Text style={styles.subtitle}>Number of cards: {this.state.deckItems}</Text>
                    <View style={styles.btnCont}>
                        <View style={styles.btnTop}>
                            <Button
                            title="Add Card"
                            onPress={() => addCard()}></Button>
                        </View>
                        <View style={styles.btn}>
                            <Button
                            title="Take Quiz"
                            onPress={() => console.log("New Card")}></Button>
                        </View>
                    </View>
                </Animated.View>
                {this.state.addCard && (
                    <View style={styles.addCard}>
                        <TextInput
                        style={styles.input}
                        placeholder="Question:"
                        onChangeText={value => question = value}
                        onBlur={Keyboard.dismiss}></TextInput>
                        <TextInput
                        style={styles.input}
                        placeholder="Answer:"
                        onChangeText={value => answer = value}
                        onBlur={Keyboard.dismiss}></TextInput>
                        
                        <Button
                        title="Add to Deck"
                        onPress={() => addToDeck(question, answer)}></Button>
                    </View>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        flex: 1,
        justifyContent: "center",
        padding: 20
    },  
    innerCont: {
        flex: 1,
        borderColor: "black",
        borderWidth: 1,
        marginTop: 50
    },  
    title: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 28
    },
    subtitle: {
        textAlign: "center",
        fontSize: 20,
        paddingTop: 30
    },
    btnCont: {
        marginTop: "auto",
        marginBottom: 25
    },
    btn : {
        marginTop: 10,
        paddingLeft: 15,
        paddingRight: 15
    },
    btnTop : {
        marginBottom: 10,
        paddingLeft: 15,
        paddingRight: 15
    },
    addCard: {
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
        padding: 10,
        borderWidth: 1,
        borderColor: "black"
    }
})

export default DeckItem