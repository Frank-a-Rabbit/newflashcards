import AsyncStorage from "@react-native-community/async-storage"

const DATA = {
    _setNotification: async() => {
        try{
            var exp = new Date();
            console.log("Notification Set");
            AsyncStorage.setItem("NOTIFICATION", exp.getTime());
        }catch(error){
            console.log(error);
        }
    },
    _getNotification: async() => {
        try{
            let notification = await AsyncStorage.getItem("NOTIFICATION");
            notification = JSON.stringify(notification);
            notification = notification.replace(/['"]+/g, '');
            notification = parseInt(notification);
            let num = new Date();
            let compare = num.getTime();
            if(notification  + ((86.4 * 1000) * 1000) > compare){
                return true;
            }else{
                return false;
            }
        }catch(error){
            console.log(error);
        }
    },
    _getDecks: async() => {
        try{
            const data = await AsyncStorage.getItem("DECKS");
            if(data !== null){
                return JSON.parse(data);
            }else{
                DATA._seed();
            }
        }catch(error){
            console.log(error);
        }
    },
    _getDeck: async(deck) => {
        console.log("From within: ", deck);
        try{
            let data = await AsyncStorage.getItem("DECKS");
            data = JSON.parse(data);
            return data[deck];
        }catch(error){
            console.log(error);
        }
    },
    _addCard: async (deck, question, answer) => {
        try {
           await AsyncStorage.getItem("DECKS").then((data) => {
                if(data === undefined){return;}
                data = JSON.parse(data);
            }).then(() => {
                
                AsyncStorage.getItem("DECKS").then((data) => {
                    let query = question;
                    let decks = JSON.parse(data);
                    let q = decks[deck].questions.filter(entry => entry.question === query);
                    if(q.length > 0){
                        console.log("This deck already contains this question.");
                    }else{
                        try {
                            let obj = {
                                question: question,
                                answer: answer
                            };
                            decks[deck].questions.push(obj);
                            AsyncStorage.setItem("DECKS", JSON.stringify(decks));
                        } catch(error) {
                            if(error){ console.log(error); }
                        }
                    }
                });
            });
        } catch (error) {
            console.log(error);
        }
    },
    _addDeck: async (title) => {
        if(!title){ console.log("Title not provided."); return true; }
        try {
          await AsyncStorage.getItem("DECKS").then((data) => {
            let decks = JSON.parse(data);
            if(Object.keys(decks).includes(title)){
                console.log("This deck already exists.");
                return;
            }else{
                let obj = {
                    title: title,
                    questions: []
                }
                decks[title] = obj;
                AsyncStorage.setItem("DECKS", JSON.stringify(decks));
            }
          })
        } catch (error) {
            console.log(error);
        }
    },
    _updateDeck: async (value) => {
        value = JSON.stringify(value);
        console.log(value);
        try {
            await AsyncStorage.setItem("DECKS", value).then(() => {
                console.log(AsyncStorage.getItem("DECKS"))
            })
          } catch (error) {
              console.log(error);
          }
    },
    _seed: async () => {
        try {
            let initData = {
                React: {
                    title: 'React',
                    questions: [
                    {
                        question: 'What is React?',
                        answer: 'A library for managing user interfaces'
                    },
                    {
                        question: 'Where do you make Ajax requests in React?',
                        answer: 'The componentDidMount lifecycle event'
                    }
                    ]
                },
                JavaScript: {
                    title: 'JavaScript',
                    questions: [
                    {
                        question: 'What is a closure?',
                        answer: 'The combination of a function and the lexical environment within which that function was declared.'
                    }
                    ]
                }
            }
            await AsyncStorage.setItem(
                "DECKS",
                JSON.stringify(initData)
            ).then(() => {
                console.log("seeding")
                DATA._getDecks();
            });
        } catch (error) {
            console.log(error);
        }
    }
};

export default DATA;