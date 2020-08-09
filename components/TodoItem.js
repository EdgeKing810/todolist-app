import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Block, Text, Icon } from "galio-framework";

export default function TodoItem({ item, removeItem }) {
    return (
        <Block style={styles.item}>
            <Text style={{ color: "white" }}>{item.name}</Text>
            <TouchableOpacity
                style={styles.delete}
                onPress={() => removeItem(item.key)}
            >
                <Icon name="delete" family="antdesign" color="pink" size={16} />
            </TouchableOpacity>
        </Block>
    );
}

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 16,
        marginVertical: 8,
        borderColor: "#bbb",
        borderWidth: 1,
        borderRadius: 10,
        borderStyle: "dashed",
    },
    delete: {
        padding: 4,
        alignItems: "center",
        justifyContent: "center",
    },
});
