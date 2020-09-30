import React, { useState } from "react";
import { StyleSheet,AsyncStorage } from "react-native";
import { Input, Block, Button } from "galio-framework";


export default function AddTodo({ addTodoListener }) {
    const [text, setText] = useState("");

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
