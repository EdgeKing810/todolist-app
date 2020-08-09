import React from "react";
import { StyleSheet } from "react-native";
import { Block, Text } from "galio-framework";

export default function Header() {
    return (
        <Block style={styles.header}>
            <Text style={styles.title}>My ToDos</Text>
        </Block>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 80,
        paddingTop: 38,
        backgroundColor: "coral",
    },
    title: {
        textAlign: "center",
        fontSize: 20,
        color: "#fff",
        fontWeight: "bold",
    },
});
