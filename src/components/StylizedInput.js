import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { Icon } from "@rneui/base";
import { Dimensions } from "react-native";

import { darkTheme, LightTheme } from "../styles/global";

export default function StylizedInput({ label, placeholder, value, onChangeText, secureTextEntry, icon, errors, ...rest }) {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={styles.inputContainer}>
                <View style={styles.inputContainer2}>
                    {icon && <Icon name={icon} size={20} color={LightTheme.secondaryText} style={styles.icon} />}
                    <TextInput
                        style={styles.input}
                        placeholder={placeholder}
                        value={value}
                        onChangeText={onChangeText}
                        secureTextEntry={secureTextEntry}
                        placeholderTextColor={LightTheme.quaternaryText}
                        {...rest}
                    />
                </View>
            </View>
            {errors && <Text style={styles.errorMessage}>{errors}</Text>}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
    },
    label: {
        color: LightTheme.primaryText,
        marginBottom: 5,
    },
    inputContainer: {
        alignItems: "center",
        borderColor: LightTheme.secondaryText,
        borderBottomWidth: 2,
        padding: 3,
        width: Dimensions.get("window").width * 0.8,
    },
    inputContainer2: {
        flexDirection: "row",
        alignItems: "center",
        width: Dimensions.get("window").width * 0.78,
        borderRadius: 8,
        padding: 5,
    },
    input: {
        backgroundColor: null,
        color: LightTheme.secondaryText,
        padding: 10,
        borderRadius: 5,
        flex: 1,
    },
    errorBorder: {
        borderBottomColor: 'red', // Cor da borda em caso de erro
    },
    errorMessage: {
        marginTop: 5,
        fontSize: 12,
        color: 'red', // Cor da mensagem de erro
    },
});