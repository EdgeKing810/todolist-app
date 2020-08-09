import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Block, Text } from "galio-framework";

export default function TodoItem({ item, removeItem }) {
    return (
        <TouchableOpacity onPress={() => removeItem(item.key)}>
            <Text style={styles.item}>{item.name}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    item: {
        padding: 16,
        marginVertical: 8,
        borderColor: "#bbb",
        borderWidth: 1,
        borderRadius: 10,
        borderStyle: "dashed",
        color: "white",
    },
});
