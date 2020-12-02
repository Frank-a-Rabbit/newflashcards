import React, {Component} from "react";
import {Text, Button, StyleSheet, Animated, View, TextInput, Keyboard} from "react-native";
import DATA from "../utils/data"; 

class DeckItem extends Component{
    constructor(props){
        super(props);

        this.state = {
            opacity: new Animated.Value(0),
            addCard: false,
            takeQuiz: false,
            deckItems: this.props.props.route.params.questions.length,
            quizItems: this.props.props.route.params.questions,
            deckTitle: this.props.props.route.params.deckName,
            currentQuestion: this.props.props.route.params.questions[0] ? this.props.props.route.params.questions[0].question : "No questions added yet",
            currentAnswer: false,
            endOfQuiz: false,
            correctAnswer: 0,
            incorrectAnswer: 0
        }
    }

    componentDidMount(){
        const {opacity} = this.state;
        Animated.timing(opacity, {toValue: 1, duration: 2500, useNativeDriver: true}).start();
    }

    componentDidUpdate(){
        if(this.props.props.navigation.isFocused()){
            this.state.addCard = false,
            this.state.takeQuiz = false
        }
        // if(this.props.props.route.params.deckName !== this.state.deckTitle){
        //     this.setState({
        //         addCard: false,
        //         takeQuiz: false,
        //         deckItems: this.props.props.route.params.questions.length,
        //         quizItems: this.props.props.route.params.questions,
        //         deckTitle: this.props.props.route.params.deckName,
        //         currentQuestion: this.props.props.route.params.questions[0].question ? this.props.props.route.params.questions[0].question : "No questions added yet",
        //         currentAnswer: false,
        //         endOfQuiz: false,
        //         correctAnswer: 0,
        //         incorrectAnswer: 0
        //     });
        // }
    }

    render(){
        const props = this.props.props;
        console.log(props)
        const updateFunc = this.props.props.route.params.updater;
        console.log("I am: ", updateFunc)
        const {opacity} = this.state;
        let question, answer;
        const addCard = () => {
            this.setState({addCard: true});
        }

        const showAnswer = question => {
            this.state.quizItems.forEach(item => {
                if(item.question === question){
                    this.setState({
                        currentAnswer: item.answer,
                        takeQuiz: true
                    });
                }
            });
        }

        const nextQuestion = (current, all) => {
            var next = all.findIndex(c => c.question === current) + 1;
            if(all[next] === undefined){
                this.setState({currentQuestion : all[0].question, takeQuiz: true});
            }else{
                this.setState({currentQuestion : all[next].question, takeQuiz: true});
            }
        }

        const restartQuiz = questions => {
            this.setState({
                currentQuestion: questions[0].question, 
                takeQuiz: true, 
                endOfQuiz: false,
                correctAnswer: 0,
                incorrectAnswer: 0
            });
        }

        const setAnswerCorrect = _ => {
            let state = this.state;
            this.setState((state) => ({
                correctAnswer: state.correctAnswer + 1,
                takeQuiz: true
            }));
        }

        const setAnswerInCorrect = _ => {
            let state = this.state;
            this.setState((state) => ({
                incorrectAnswer: state.incorrectAnswer + 1,
                takeQuiz: true
            }));
        }

        const TakeQuiz = ({...deck}) => {
            let quizQuestions = deck.deck;
            let totalNumber = deck.deck.length;
            let showNextButton = !this.state.endOfQuiz && totalNumber > 1;
            let quizComplete = this.state.correctAnswer + this.state.incorrectAnswer == this.state.deckItems;
            if(quizComplete){
                DATA._setNotification();
            }
            return(
                <View>
                    <Text style={styles.quizTitle}>{this.props.props.route.params.deckName}</Text>
                    {quizComplete && (
                        <View>
                            <Text style={styles.cardTitle}>You got {this.state.correctAnswer} correct</Text>
                            <Text style={styles.cardTitle}>You got {this.state.incorrectAnswer} incorrect</Text>
                        </View>
                    )}
                    {!quizComplete && (
                        <View>
                            <Text style={styles.cardTitle}>{this.state.currentQuestion}</Text>
                            <Text style={styles.cardTitle}>Question {quizQuestions.findIndex(q => q.question === this.state.currentQuestion) + 1} of {totalNumber}</Text>
                            <View
                            style={styles.btn}><Button
                            title="Correct"
                            onPress={() => setAnswerCorrect()}></Button></View>
                            <View
                            style={styles.btn}><Button
                            title="Incorrect"
                            onPress={() => setAnswerInCorrect()}></Button></View>
                            <View
                            style={styles.btn}><Button
                            title="Show Answer"
                            onPress={() => showAnswer(this.state.currentQuestion)}></Button></View>
                            {showNextButton && (
                        <View
                            style={styles.btn}><Button
                            title="Next Question"
                            onPress={() => nextQuestion(this.state.currentQuestion, quizQuestions)}></Button></View>
                        )}
                        </View>
                    )}
                    {quizComplete && (
                        <View
                        style={styles.btn}>
                            <Button
                                title="Restart Quiz"
                                onPress={() => restartQuiz(quizQuestions)}>
                            </Button>
                        </View>
                    )}
                    {quizComplete && (
                        <View
                        style={styles.btn}>
                            <Button
                                title="Back to Deck"
                                onPress={() => this.setState({
                                    takeQuiz: false,
                                    correctAnswer: 0,
                                    incorrectAnswer: 0
                                })}>
                            </Button>
                        </View>
                    )}
                    {this.state.currentAnswer && (
                        <View
                        style={styles.answerScreen}>
                            <Text style={styles.quizTitle}>{this.state.currentAnswer}</Text>
                            <Button
                            title="Close"
                            style={styles.closeAnswer}
                            onPress={ _ => this.setState({
                                currentAnswer: false,
                                takeQuiz: true
                            })}
                            ></Button>
                        </View>
                    )}
                </View>
            )
        }

        const addToDeck = () => {
            if(question === undefined || answer === undefined){
                return;
            }

            DATA._addCard(props.route.params.deckName, question, answer).then( _ => {
                DATA._getDecks("DECKS").then(response => {
                    this.props.props.route.params.questions.length += 1;
                    this.setState({
                        addCard: false,
                        takeQuiz: false,
                        deckItems: response[props.route.params.deckName].questions.length,
                        quizItems: response[props.route.params.deckName].questions,
                        currentQuestion: response[props.route.params.deckName].questions[0].question
                        
                    });
                    updateFunc(response[props.route.params.deckName]);
                });
            });
        }  

        return(
            <View style={styles.container}>
                <Animated.View style={[styles.innerCont, {opacity}]}>
                    <Text style={styles.title}>{props.route.params.deckName}</Text>
                    <Text style={styles.subtitle}>Number of cards: {this.props.props.route.params.questions.length}</Text>
                    <View style={styles.btnCont}>
                        <View style={styles.btnTop}>
                            <Button
                            title="Add Card"
                            onPress={() => addCard()}></Button>
                        </View>
                        {this.state.deckItems > 0 && (
                            <View style={styles.btn}>
                                <Button
                                title="Take Quiz"
                                onPress={() => {
                                    this.setState({
                                        takeQuiz: true,
                                        currentQuestion: this.props.props.route.params.questions[0].question
                                    });
                                    DATA._setNotification();
                                }}></Button>
                            </View>
                        )}
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
                {this.state.takeQuiz && (
                    <View style={styles.quizCont}>
                        <TakeQuiz deck={this.state.quizItems}></TakeQuiz>
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
        marginTop: 150
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
    },
    quizCont: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 20,
        backgroundColor: "red"
    },
    quizTitle: {
        marginBottom: 100,
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 28
    },
    cardTitle: {
        marginBottom: 20,
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 20
    },
    answerScreen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 21,
        backgroundColor: "red"
    },
    closeAnswer: {
        position: "absolute",
        top: 15,
        right: 15
    }
})

export default DeckItem