import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";
import { Icon } from "@rneui/base";
import StylizedInput from "../../components/StylizedInput";
import StylizedButton from "../../components/StylizedButton";
import { LightTheme } from "../../styles/global";
import { createModule } from "../../service/moduleService";

// filepath: c:/Users/Voltage/Documents/Projetos/Kepos/kepos-mobile/kepos-wind/src/screens/private/AddModulePage.js

const validationSchema = Yup.object().shape({
    name: Yup.string().required("O nome do módulo é obrigatório"),
    desc: Yup.string().required("O Descrição do módulo é obrigatório"),
});

export default function AddModulePage({ navigation, route }) {
    const dendroId = route?.params?.dendroId;
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [apiError, setApiError] = useState(null);

    const handleValidation = useCallback(async () => {
        setErrors({});
        setApiError(null);
        setIsLoading(true);
        try {
            await validationSchema.validate(
                {
                    name,
                    desc,
                },
                { abortEarly: false }
            );
            await handleAddModule();
        } catch (err) {
            if (err.inner) {
                // Yup validation errors
                const formErrors = {};
                err.inner.forEach(e => {
                    formErrors[e.path] = e.message;
                });
                setErrors(formErrors);
            } else {
                setApiError(err.message || "Erro de validação");
            }
            setIsLoading(false);
        }
    }, [name, desc, dendroId]);

    const handleAddModule = useCallback(async () => {
        try {
            const moduleDTO = {
                name,
                desc,
                humidity: 0,
                humidityLevel: 0,
                idDendro: dendroId,
            };
            await createModule(moduleDTO);
            setIsSuccess(true);
            setIsLoading(false);
        } catch (error) {
            setApiError(error.message || "Erro ao adicionar módulo");
            setIsLoading(false);
        }
    }, [name, desc, dendroId]);

    function renderForm() {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.mainContainer}>
                        <Text style={styles.title}>Adicionar Módulo</Text>
                        <View style={styles.inputContainer}>
                            <StylizedInput
                                placeholder="Nome do módulo"
                                icon="yard"
                                value={name}
                                onChangeText={setName}
                                errors={errors.name}
                                maxLength={40}
                            />
                            <StylizedInput
                                label="Descrição"
                                placeholder="Descrição do módulo"
                                icon="edit-note"
                                value={desc}
                                onChangeText={setDesc}
                                errors={errors.desc}
                                maxLength={100}
                            />
                            {apiError && (
                                <Text style={styles.apiError}>{apiError}</Text>
                            )}
                        </View>
                        <View style={styles.btnContainer}>
                            <StylizedButton
                                text="Adicionar Módulo"
                                icon="add"
                                onPress={handleValidation}
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
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }

    function renderSuccess() {
        return (
            <View style={styles.mainContainer}>
                <Text style={styles.title}>Adicionar Módulo</Text>
                <View style={styles.inputContainer}>
                    <Icon
                        name="check-circle"
                        type="material"
                        size={100}
                        color={LightTheme.primaryText}
                    />
                    <Text style={styles.instructions}>Módulo adicionado com sucesso!</Text>
                </View>
                <View style={styles.btnContainer}>
                    <StylizedButton
                        text="Voltar"
                        icon="arrow-back"
                        onPress={() => navigation.goBack()}
                    />
                    <StylizedButton
                        text="Adicionar Outro Módulo"
                        icon="add"
                        onPress={() => {
                            setName("");
                            setDesc("");
                            setIsSuccess(false);
                            setErrors({});
                            setApiError(null);
                        }}
                    />
                </View>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeAreaView}>
            {isSuccess ? renderSuccess() : renderForm()}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: LightTheme.primaryBG,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
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
        marginBottom: 20,
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
    instructions: {
        color: LightTheme.primaryText,
        fontSize: 20,
        fontWeight: "300",
        textAlign: "center",
        marginVertical: 10,
    },
    apiError: {
        color: "red",
        fontSize: 14,
        marginTop: 10,
        textAlign: "center",
    },
});