import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import { Icon } from "@rneui/base";

import { LightTheme } from "../styles/global.js";

export default function StylizedButton({ text, onPress, icon }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button} >
            <View style={styles.container}>
                <View>
                    <Text style={styles.text}>{text}</Text>
                </View>
                <View>
                    {icon && <Icon name={icon} size={20} color={LightTheme.secondaryText} style={styles.icon} />}
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: LightTheme.secondaryBG,
        borderRadius: 10,
        borderColor: LightTheme.secondaryText,
        borderWidth: 1,
        width: Dimensions.get("window").width * 0.8,
        margin: 5,
        alignContent: "center",
        justifyContent: "space-around",
    },
    container: {
        width: Dimensions.get("window").width * 0.75,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 5,
    },
    textContainer: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: '#000',
    },
    iconContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: LightTheme.secondaryText,
        fontSize: 16,
        marginRight: 10,
    },
});