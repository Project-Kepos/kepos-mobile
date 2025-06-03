import { StatusBar } from "expo-status-bar";
import { Image, SafeAreaView, StyleSheet, View } from "react-native";
import StylizedButton from "../../components/StylizedButton";
import { LightTheme } from "../../styles/global";
import StylizedInput from "../../components/StylizedInput";

export default function LoginPage() {
    return (
        <SafeAreaView style={styles.safeAreaView}>
            <StatusBar style="dark" backgroundColor={LightTheme.primaryBG} />
            <View style={styles.mainContainer}>
                <View style={styles.imgContainer}>
                    <Image
                        source={require("../../../assets/KeposLogoMini.png")}
                        style={styles.img}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.authContainer}>
                    <View style={styles.inputCOntainer}>
                        <StylizedInput
                            placeholder="Digite seu email"
                            icon="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            keyboardType="email-address"
                            errors={null}
                        />
                        <StylizedInput
                            placeholder="Digite sua senha"
                            icon="lock"
                            secureTextEntry={true}
                            autoCapitalize="none"
                            autoComplete="password"
                            errors={null}
                        />
                    </View>
                    <View style={styles.buttonCOntainer}>
                        <StylizedButton
                            text="Fazer Login"
                            onPress={() => console.log("Login Pressed")}
                            icon="login"
                        />
                        <StylizedButton
                            text="Realizar Cadastro"
                            onPress={() => console.log("Register Pressed")}
                            icon="person-add"
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
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
    inputCOntainer: {
        marginBottom: 20,
    },
    imgContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    img: {
        width: 100,
        height: 100,
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
})