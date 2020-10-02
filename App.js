import React, { useState,useEffect } from "react";
import {
    StyleSheet,
    FlatList,
    Alert,
    TouchableWithoutFeedback,
    Keyboard,
    AsyncStorage,
} from "react-native";
import { Block } from "galio-framework";

const { v1 } = require("uuid");

import Header from "./components/Header";
import TodoItem from "./components/TodoItem";
import AddTodo from "./components/AddTodo";

export default function App() {
    const [todos, setTodos] = useState([
        { name: "Buy Coffee", key: "a" },
        { name: "Make an App", key: "b" },
        { name: "Play NFS Heat", key: "c" },
    ]);

    const removeItem = (key) => {
        setTodos((prev) => prev.filter((todo) => todo.key != key));
    };

    const storeLocally=()=>{
        _storeData = async () => {
            try {
              await AsyncStorage.setItem(
                'localTodos',
                JSON.stringify(todos)
              );
            } catch (error) {
              console.log(error);
            }
          };
    }
    

    useEffect(()=>{
        try{
            const value=await AsyncStorage.getItem('localTodos');
            if(value!=null){
                let parsedValues=JSON.parse(value);
                parsedValues.forEach(parsedValue=>{
                    console.log(`${parsedValue.key} : ${parsedValue.name}`);
                });
            }
        }
        catch(error){
            console.log(error);
        }
    },[todos]);

    const addTodoListener = (text) => {
        if (text.length > 3) {
            let key=v1.toString();
            setTodos((prev) => [...prev, { name: text, key: key }]);
            storeLocally(); //Save the todos in localstorage
        } else {
            Alert.alert("OOPS!", "ToDos must be over 3 chars long!", [
                { text: "understood" },
            ]);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <Block style={styles.container}>
                <Header />
                <Block style={styles.content}>
                    <AddTodo addTodoListener={addTodoListener} />
                    <Block style={styles.list}>
                        <FlatList
                            style={{ paddingHorizontal: 8 }}
                            data={todos}
                            renderItem={({ item }) => (
                                <TodoItem item={item} removeItem={removeItem} />
                            )}
                        />
                    </Block>
                </Block>
            </Block>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#555",
    },
    content: {
        flex: 1,
        padding: 40,
    },
    list: {
        flex: 1,
        marginTop: 12,
    },
});
