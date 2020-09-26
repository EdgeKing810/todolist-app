import React, { useState } from "react";
import { StyleSheet,AsyncStorage } from "react-native";
import { Input, Block, Button } from "galio-framework";

_storeData = async () => {
    try {
      await AsyncStorage.setItem(
        '@MySuperStore:key',
        'I like to save it.'
      );
    } catch (error) {
      // Error saving data
    }
  };
const saveDataLocally=(data,number)=>{
    _storeData = async () => {
        try {
          await AsyncStorage.setItem(
            `TODO ${number}`,
            data
          );
        } catch (error) {
          console.log(error);
        }
      };
    
}
export default function AddTodo({ addTodoListener }) {
    const [text, setText] = useState("");
    const [todoNumber,setTodoNumber]=useState(0);

    return (
        <Block style={styles.block}>
            <Input
                placeholder="New ToDo..."
                onChangeText={(value) => setText(value)}
                style={styles.input}
                value={text}
            />
            <Button
                onPress={() => {
                    addTodoListener(text);
                    setText("");
                    setTodoNumber(todoNumber+1);
                    saveDataLocally(text,todoNumber);
                }}
                color="warning"
            >
                Add ToDo
            </Button>
        </Block>
    );
}

const styles = StyleSheet.create({
    block: {
        alignItems: "center",
    },
    input: {
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
    },
});
