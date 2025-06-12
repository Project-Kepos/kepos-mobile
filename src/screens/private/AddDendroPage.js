import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import * as Yup from "yup";

import { LightTheme } from "../../styles/global";
import StylizedInput from "../../components/StylizedInput";
import StylizedButton from "../../components/StylizedButton";
import { Icon } from "@rneui/base";

const validationSchema = Yup.object().shape({
    dendroId: Yup.string()
        .matches(/^[A-Z]{4}-[A-Z]{4}-[A-Z]{4}-[A-Z]{4}$/, "O código deve seguir o formato ABCD-EFGH-IJKL-MNOP")
        .required("O código da estufa é obrigatório"),
})

export default function AddDendroPage({ navigation }) {
    const [dendroId, setDendroId] = useState('');
    const [errors, setErrors] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    function insertCode() {
        return (
            <View style={styles.mainContainer}>
                <Text style={styles.title}>Adicionar Estufa</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.instructions}>Insira o código de 12 digitos da sua estufa</Text>
                    <StylizedInput
                        placeholder="ABCD-EFGH-IJKL-MNOP"
                        icon="home"
                        value={dendroId}
                        onChangeText={setDendroId}
                        errors={errors} // Replace with actual error handling if needed
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
        )
    }

    function searchingDendro() {
        return (
            <View style={styles.mainContainer}>
                <Text style={styles.title}>Adicionar Estufa</Text>
                <View style={styles.inputContainer}>
                    <Icon
                        name="sensors"
                        type="material"
                        size={100}
                        color={LightTheme.primaryText}
                    />
                    <Text style={styles.instructions}>Insira o código de 12 digitos da sua estufa</Text>
                </View>
                <StylizedButton
                    text="Cancelar"
                    icon="close"
                    onPress={() => navigation.goBack()}
                />
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.safeAreaView}>
            {/* AddDendroPage content goes here */}
            {searchingDendro()}
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