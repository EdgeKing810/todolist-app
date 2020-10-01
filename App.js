import React, { useState } from "react";
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

    const storeLocally=(key,text)=>{
        _storeData = async () => {
            try {
              await AsyncStorage.setItem(
                key,
                text
              );
            } catch (error) {
              console.log(error);
            }
          };
    }

    const addTodoListener = (text) => {
        if (text.length > 3) {
            let key=v1.toString();
            setTodos((prev) => [...prev, { name: text, key: key }]);
            storeLocally(key,text); //Save the todos in localstorage
            showTodos();  //if todo has been saved successfully, fetch/show all todos
        } else {
            Alert.alert("OOPS!", "ToDos must be over 3 chars long!", [
                { text: "understood" },
            ]);
        }
    };

    const showTodos=()=>{
        todos.forEach(todo=>{
            try{
                const value=await AsyncStorage.getItem(todo.key);
                if(value!=null){
                    console.log(value);
                }
            }
            catch(error){
                console.log(error);
            }
        });
    }

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
