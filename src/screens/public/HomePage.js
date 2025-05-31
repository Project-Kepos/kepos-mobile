import { StyleSheet, Text, View } from "react-native";

export default function HomePage() {
    return (
        <View style={styles.container}>
            <Text>
                Bem-vindo ao Kepos Wind!
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
    },
});
