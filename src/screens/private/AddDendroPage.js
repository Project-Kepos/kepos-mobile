import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View } from "react-native";
import { useCallback, useState } from "react";
import * as Yup from "yup";

import { LightTheme } from "../../styles/global";
import StylizedInput from "../../components/StylizedInput";
import StylizedButton from "../../components/StylizedButton";
import { Icon } from "@rneui/base";
import { addUserToDendro } from "../../service/dendroService";

const validationSchema = Yup.object().shape({
    dendroId: Yup.string()
        .min(12, "O código da estufa deve ter 12 caracteres")
        .required("O código da estufa é obrigatório"),
})

export default function AddDendroPage({ navigation }) {
    const [dendroId, setDendroId] = useState('');
    const [errors, setErrors] = useState(null);
    const [missingDendroId, setMissingDendroId] = useState(false);
    const [alert, setAlert] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Função para adicionar o usuário à dendro
    const addDendro = useCallback(async () => {
        console.log("addDendro: iniciando com dendroId =", dendroId);
        try {
            // O service espera um objeto DendroDTO, não apenas o id
            const response = await addUserToDendro({ id: dendroId });
            console.log("addDendro: sucesso, response =", response);
            setIsSuccess(true);
            setIsLoading(false);
            setDendroId('');
        } catch (error) {
            // O service já lança um erro com a mensagem correta
            const message = error.message || "Erro ao adicionar estufa";
            console.log("addDendro: erro, message =", message, "error =", error);
            // Se for erro de já associada, mostre alerta específico
            if (message.toLowerCase().includes("associad")) {
                setAlert(true);
                setMissingDendroId(false);
            } else {
                setMissingDendroId(true);
                setAlert(false);
            }
            setErrors(message);
            setIsLoading(false);
        }
    }, [dendroId]);

    // Validação do formulário
    const handleValidation = useCallback(async () => {
        console.log("handleValidation: iniciando validação com dendroId =", dendroId);
        setErrors(null);
        setIsLoading(true);
        setIsSuccess(false);
        setAlert(false);
        setMissingDendroId(false);
        try {
            await validationSchema.validate({ dendroId });
            console.log("handleValidation: validação bem sucedida");
            await addDendro();
        } catch (error) {
            console.log("handleValidation: erro de validação =", error);
            setErrors(error.message || "Erro de validação");
            setIsLoading(false);
        }
    }, [dendroId, addDendro]);

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
                        onChangeText={(text) => setDendroId(text)}
                        errors={errors}
                        maxLength={12}
                        mask="AAAA-AAAA-AAAA-AAAA"
                    />
                </View>
                <View style={styles.btnContainer}>
                    <StylizedButton
                        text="Adicionar Estufa"
                        icon="add"
                        onPress={() => handleValidation()}
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

    function searchingDendro(id) {
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
                    <Text style={styles.instructions}>Buscando Estufa {id}</Text>
                </View>
                <StylizedButton
                    text="Cancelar"
                    icon="close"
                    onPress={() => {
                        setDendroId(''); // Clear the input field
                        setErrors(null); // Reset errors
                        setIsSuccess(false); // Reset success state
                        setAlert(false); // Reset alert state
                        setMissingDendroId(false); // Reset missingDendroId state
                        navigation.goBack(); // Navigate back to previous screen
                    }}
                />
            </View>
        )
    }

    function errorDendro() {
        return (
            <View style={styles.mainContainer}>
                <Text style={styles.title}>Adicionar Estufa</Text>
                <View style={styles.inputContainer}>
                    <Icon
                        name="cancel"
                        type="material"
                        size={100}
                        color={LightTheme.primaryText}
                    />
                    <Text style={styles.instructions}>Erro ao encontrar estufa</Text>
                </View>

                <View style={styles.btnContainer}>
                    <StylizedButton
                        text="Tentar Novamente"
                        icon="refresh"
                        onPress={() => {
                            setDendroId(''); // Clear the input field
                            setErrors(null); // Reset errors
                            setIsSuccess(false); // Reset success state
                            setAlert(false); // Reset alert state
                            setMissingDendroId(false); // Reset missingDendroId state
                        }}
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

    function alertDendro() {
        return (
            <View style={styles.mainContainer}>
                <Text style={styles.title}>Adicionar Estufa</Text>
                <View style={styles.inputContainer}>
                    <Icon
                        name="warning"
                        type="material"
                        size={100}
                        color={LightTheme.primaryText}
                    />
                    <Text style={styles.instructions}>Estufa já associada com o usuario</Text>
                </View>

                <View style={styles.btnContainer}>
                    <StylizedButton
                        text="Tentar Novamente"
                        icon="refresh"
                        onPress={() => {
                            setDendroId(''); // Clear the input field
                            setErrors(null); // Reset errors
                            setIsSuccess(false); // Reset success state
                            setAlert(false); // Reset alert state
                            setMissingDendroId(false); // Reset missingDendroId state // Navigate back to AddDendroPage
                        }}
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

    function successDendro() {
        return (
            <View style={styles.mainContainer}>
                <Text style={styles.title}>Adicionar Estufa</Text>
                <View style={styles.inputContainer}>
                    <Icon
                        name="check-circle"
                        type="material"
                        size={100}
                        color={LightTheme.primaryText}
                    />
                    <Text style={styles.instructions}>Estufa Adicionada com Sucesso!</Text>
                </View>

                <View style={styles.btnContainer}>
                    <StylizedButton
                        text="Voltar para o Início"
                        icon="home"
                        onPress={() => navigation.navigate("Home")}
                    />
                    <StylizedButton
                        text="Adicionar Outra Estufa"
                        icon="add"
                        onPress={() => {
                            setDendroId(''); // Clear the input field
                            setErrors(null); // Reset errors
                            setIsSuccess(false); // Reset success state
                            setAlert(false); // Reset alert state
                            setMissingDendroId(false); // Reset missingDendroId state
                            }}
                    />
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.safeAreaView}>
            {
                isLoading ? searchingDendro() :
                    isSuccess ? successDendro() :
                        missingDendroId ? errorDendro() :
                            alert ? alertDendro() :
                                insertCode()
            }
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