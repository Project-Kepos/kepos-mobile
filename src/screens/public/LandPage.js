import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LightTheme } from "../../styles/global";
import StylizedButton from "../../components/StylizedButton";


export default function LandPage({ navigation }) {
    return (
        <SafeAreaView style={styles.safeAreaView}>
            <StatusBar style="dark" backgroundColor={LightTheme.primaryBG} />
            <View style={styles.mainContainer}>
                <View style={styles.imgContainer}>
                    <Image
                        source={
                            require("../../../assets/KeposLogo.png")
                        }
                        style={styles.img}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.authContainer}>
                    <StylizedButton
                        text="Fazer Login"
                        onPress={() => navigation.navigate("Login")}
                        icon="login"
                    />
                    <StylizedButton
                        text="Realizar Cadastro"
                        onPress={() => navigation.navigate("Sign")}
                        icon="person-add"
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: LightTheme.primaryBG,
    },
    mainContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    imgContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    img: {
        width: 300,
        height: 300,
        resizeMode: "contain",
    },
    authContainer: {
        padding: 15,
        margin: 20,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: LightTheme.TerciaryBG,
        borderRadius: 10,
        borderColor: LightTheme.secondaryText,
        borderWidth: 1,
    },
});
