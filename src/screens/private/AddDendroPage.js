import { SafeAreaView } from "react-native-safe-area-context";
import { LightTheme } from "../../styles/global";
import { StyleSheet, Text, View } from "react-native";
import StylizedInput from "../../components/StylizedInput";
import StylizedButton from "../../components/StylizedButton";
import { useState } from "react";

export default function AddDendroPage({ navigation }) {
    const [dendroId, setDendroId] = useState('');

    return (
        <SafeAreaView style={styles.safeAreaView}>
            {/* AddDendroPage content goes here */}
            <View style={styles.mainContainer}>
                <Text style={styles.title}>Adicionar Estufa</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.instructions}>Insira o código de 12 digitos da sua estufa</Text>
                    <StylizedInput
                        placeholder="ABCD-EFGH-IJKL-MNOP"
                        icon="home"
                        value={dendroId}
                        onChangeText={setDendroId}
                        errors={null} // Replace with actual error handling if needed
                    />
                </View>
                <View style={styles.btnContainer}>
                    <StylizedButton
                        text="Adicionar Estufa"
                        icon="add"
                        onPress={() => console.log("Adicionar Estufa Pressionado")}
                    />
                    <StylizedButton
                        text="Cancelar"
                        icon="close"
                        onPress={() => navigation.goBack()}
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
        marginTop: 20,
        marginHorizontal: 20,
        alignItems: "center",
        justifyContent: "space-between",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: LightTheme.primaryText,
        textAlign: "center",
        marginTop: 40,
    },
    inputContainer: {
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        borderRadius: 10,
        borderColor: LightTheme.secondaryText,
        marginBottom: 20,
    },
    instructions: {
        color: LightTheme.primaryText,
        fontSize: 30,
        fontWeight: 300,
        textAlign: "center",
        marginBottom: 10,
    },
})