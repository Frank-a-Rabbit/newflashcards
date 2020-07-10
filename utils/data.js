import AsyncStorage from "@react-native-community/async-storage"

const DATA = {
    _getDecks: async() => {
        try{
            const data = await AsyncStorage.getItem("DECKS");
            if(data !== null){
                return data;
            }else{
                DATA._seed();
            }
        }catch(error){
            console.log(error);
        }
    },
    _saveDeckTitle: async () => {
        try {
          await AsyncStorage.setItem(
            "@MySuperStore:key",
            "I like to save it."
          );
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
                DATA._getDecks();
            });
        } catch (error) {
            console.log(error);
        }
    }
};

export default DATA;