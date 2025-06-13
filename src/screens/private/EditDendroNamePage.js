import React, { useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View, Alert } from "react-native";
import * as Yup from "yup";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LightTheme } from "../../styles/global";
import StylizedInput from "../../components/StylizedInput";
import StylizedButton from "../../components/StylizedButton";
import { updateDendro, getDendroById } from "../../service/dendroService";

// filepath: c:\Users\Voltage\Documents\Projetos\Kepos\kepos-mobile\kepos-wind\src\screens\private\EditDendroNamePage.js


const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, "O nome deve ter pelo menos 3 caracteres")
        .max(50, "O nome deve ter no máximo 50 caracteres")
        .required("O nome é obrigatório"),
});

export default function EditDendroNamePage() {
    const navigation = useNavigation();
    const route = useRoute();
    const { dendroId, currentName } = route.params;

    const [name, setName] = useState(currentName || "");
    const [errors, setErrors] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleUpdate = useCallback(async () => {
        setErrors(null);
        setIsLoading(true);
        try {
            await validationSchema.validate({ name });
            await updateDendro(dendroId, { name });
            setIsLoading(false);
            Alert.alert("Sucesso", "Nome da estufa atualizado com sucesso!", [
                { text: "OK", onPress: () => navigation.goBack() }
            ]);
        } catch (error) {
            setIsLoading(false);
            if (error.name === "ValidationError") {
                setErrors(error.message);
            } else {
                setErrors(error.message || "Erro ao atualizar nome da estufa");
            }
        }
    }, [name, dendroId, navigation]);

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.mainContainer}>
                <Text style={styles.title}>Editar Nome da Estufa</Text>
                <View style={styles.inputContainer}>
                    <StylizedInput
                        label="Novo nome"
                        placeholder="Digite o novo nome da estufa"
                        value={name}
                        onChangeText={setName}
                        icon="edit"
                        errors={errors}
                        maxLength={50}
                        editable={!isLoading}
                    />
                </View>
                <View style={styles.btnContainer}>
                    <StylizedButton
                        text={isLoading ? "Salvando..." : "Salvar"}
                        icon="check"
                        onPress={handleUpdate}
                        disabled={isLoading}
                    />
                    <StylizedButton
                        text="Cancelar"
                        icon="close"
                        onPress={() => navigation.goBack()}
                        disabled={isLoading}
                    />
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
        marginTop: 20,
        marginHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: LightTheme.primaryText,
        textAlign: "center",
        marginBottom: 30,
    },
    inputContainer: {
        width: "100%",
        alignItems: "center",
        marginBottom: 20,
    },
    btnContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
});