import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import DendroCard from "../../components/DendroCard";
import { Icon } from "@rneui/themed";
import { useCallback, useContext, useEffect, useState } from "react";
import * as Yup from 'yup';

import { LightTheme } from "../../styles/global";
import { AuthContext } from "../../context/AuthContext";
import { getUserDendros } from "../../service/dendroService";
import StylizedInput from "../../components/StylizedInput";
import { getLoggedUser, updateUser } from "../../service/userService";
import StylizedButton from "../../components/StylizedButton";

const validationSchema = Yup.object().shape({
    nome: Yup.string()
        .required("Nome é obrigatório"),
    email: Yup.string()
        .email("Email inválido")
        .required("Email é obrigatório"),
    senha: Yup.string()
        .test(
            "senha-min-length",
            "Senha deve ter pelo menos 6 caracteres",
            value => !value || value.length === 0 || value.length >= 6
        ),
    confirmarSenha: Yup.string()
        .oneOf([Yup.ref('senha'), null], 'As senhas devem corresponder')
})

export default function ProfilePage() {
    const { logout, saveToken } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState({
        nome: "",
        email: "",
        senha: "",
        confirmarSenha: ""
    });
    const [newUserData, setNewUserData] = useState({
        nome: "",
        email: "",
        senha: "",
        confirmarSenha: ""
    });

    const getUserData = useCallback(async () => {
        try {
            const response = await getLoggedUser();
            console.log("Dados do usuário:", response);
            setUserData(response);
        } catch (error) {
            console.error("Erro ao buscar dados do usuário:", error);
            if (error.response?.data?.message) {
                console.error(error.response.data.message);
            }
        }
    }, []);

    useEffect(() => {
        getUserData();
        console.log("Dados do usuário carregados:", userData);
    }, []);

    const handleSaveChanges = useCallback(async () => {
        console.log("Iniciando handleSaveChanges");
        setErrors({
            nome: "",
            email: "",
            senha: "",
            confirmarSenha: ""
        });

        try {
            console.log("Validando dados:", newUserData);
            await validationSchema.validate(newUserData, { abortEarly: false });

            const payload = {
                nome: newUserData.nome,
                email: newUserData.email,
                senha: newUserData.senha ? newUserData.senha : undefined
            };

            console.log("Payload para updateUser:", payload);

            const response = await updateUser(payload);
            console.log("Resposta do updateUser:", response);

            saveToken(response)
            getUserData()
            setNewUserData({
                nome: response.nome,
                email: response.email,
                senha: "",
                confirmarSenha: ""
            });
            setIsEditing(false);

        } catch (error) {
            if (error.name === "ValidationError") {
                // Erros de validação do formulário
                const validationErrors = {};
                error.inner.forEach(err => {
                    validationErrors[err.path] = err.message;
                });
                setErrors(validationErrors);
                console.log("Erros de validação:", validationErrors);
            } else {
                // Erros da API ao atualizar a conta
                const updateErrors = {};
                if (error.response && error.response.data) {
                    // Pode haver múltiplos campos com erro, adapte conforme a resposta da sua API
                    if (error.response.data.errors) {
                        Object.entries(error.response.data.errors).forEach(([field, message]) => {
                            updateErrors[field] = message;
                        });
                    } else if (error.response.data.message) {
                        updateErrors.email = error.response.data.message;
                    } else {
                        updateErrors.email = "Erro ao atualizar conta";
                    }
                    console.log("Erro da API ao atualizar conta:", error.response.data);
                } else {
                    updateErrors.email = "Erro de rede ou servidor ao atualizar conta";
                    console.log("Erro de rede ou servidor ao atualizar conta:", error);
                }
                setErrors(updateErrors);
            }
            console.log("Finalizando handleSaveChanges");
        }
    }, [newUserData]);

    if (!userData) {
        return (
            <SafeAreaView style={styles.safeAreaView}>
                <StatusBar style="auto" />
                <View style={styles.mainContainer}>
                    <Text style={styles.loadingTXT}>Carregando dados do usuário...</Text>
                    <View style={styles.btnContainer}>
                            <StylizedButton
                                text={"Deslogar"}
                                icon="logout"
                                onPress={logout}
                                buttonStyle={{ backgroundColor: LightTheme.secondaryBG }}
                                textStyle={{ color: LightTheme.primaryText }}
                            />
                        </View>
                </View>
            </SafeAreaView>
        );
    }

    function userDataInpust() {
        return (
            <View style={styles.userDataContainer}>
                <StylizedInput
                    label="Nome"
                    placeholder={userData.nome || "Usuario Desconhecido"}
                    value="" // Aqui você pode colocar o valor do nome do usuário
                    onChangeText={() => { }} // Aqui você pode definir a função para atualizar o nome
                    editable={false} // Desabilitado para edição
                />
                <StylizedInput
                    label="Email"
                    placeholder={userData.email || "Email Desconhecido"}
                    value="" // Aqui você pode colocar o valor do email do usuário
                    onChangeText={() => { }} // Aqui você pode definir a função para atualizar o email
                    editable={false} // Desabilitado para edição
                />
            </View>
        )
    }

    function userDataInputsEditable() {
        return (
            <View style={styles.userDataContainer}>
                <StylizedInput
                    label="Nome"
                    placeholder={userData.nome || "Usuario Desconhecido"}
                    value={newUserData.nome}
                    onChangeText={(text) => setNewUserData({ ...newUserData, nome: text })}
                    errors={
                        errors.nome
                    }
                />
                <StylizedInput
                    label="Email"
                    placeholder={userData.email || "Email Desconhecido"}
                    value={newUserData.email}
                    onChangeText={(text) => setNewUserData({ ...newUserData, email: text })}
                    errors={
                        errors.email
                    }
                />
                <StylizedInput
                    label="Senha"
                    placeholder="Nova Senha"
                    secureTextEntry={true}
                    value={newUserData.senha}
                    onChangeText={(text) => setNewUserData({ ...newUserData, senha: text })}
                    errors={
                        errors.senha
                    }
                />
                <StylizedInput
                    label="Confirmar Senha"
                    placeholder="Confirme a Nova Senha"
                    secureTextEntry={true}
                    value={newUserData.confirmarSenha}
                    onChangeText={(text) => setNewUserData({ ...newUserData, confirmarSenha: text })}
                    errors={
                        errors.confirmarSenha
                    }
                />
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <StatusBar style="auto" />
            <View style={styles.mainContainer}>
                <View style={styles.subContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>Minha Conta</Text>
                    </View>
                    {
                        isEditing ? userDataInputsEditable() : userDataInpust()
                    }
                </View>
                {
                    isEditing ? (
                        <View style={styles.btnContainer}>
                            <StylizedButton
                                text={"Salvar Alterações"}
                                icon="done"
                                onPress={() => {
                                    handleSaveChanges();
                                }}
                                buttonStyle={{ backgroundColor: LightTheme.secondaryBG }}
                                textStyle={{ color: LightTheme.primaryText }}
                            />
                            <StylizedButton
                                text={"Cancelar Alterações"}
                                icon="close"
                                onPress={() => {
                                    setIsEditing(false);
                                    setNewUserData({
                                        nome: userData.nome,
                                        email: userData.email,
                                        senha: "",
                                        confirmarSenha: ""
                                    });
                                }}
                                buttonStyle={{ backgroundColor: LightTheme.secondaryBG }}
                                textStyle={{ color: LightTheme.primaryText }}
                            />
                        </View>
                    ) : (
                        <View style={styles.btnContainer}>
                            <StylizedButton
                                text={"Editar Perfil"}
                                icon="edit"
                                onPress={() => {
                                    setIsEditing(true);
                                    setNewUserData({
                                        nome: userData.nome,
                                        email: userData.email,
                                        senha: "",
                                        confirmarSenha: ""
                                    });
                                }}
                                buttonStyle={{ backgroundColor: LightTheme.secondaryBG }}
                                textStyle={{ color: LightTheme.primaryText }}
                            />
                            <StylizedButton
                                text={"Deslogar"}
                                icon="logout"
                                onPress={logout}
                                buttonStyle={{ backgroundColor: LightTheme.secondaryBG }}
                                textStyle={{ color: LightTheme.primaryText }}
                            />
                        </View>
                    )
                }
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
        justifyContent: "space-between",
        marginTop: 20,
        marginHorizontal: 20,
    },
    titleContainer: {
        marginBottom: 20,
    },
    titleText: {
        fontSize: 24,
        fontWeight: "bold",
        color: LightTheme.primaryText,
    },
    userDataContainer: {
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    loadingTXT: {
        fontSize: 18,
        color: LightTheme.primaryText,
        textAlign: "center",
        marginTop: 20,
    },
    btnContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
})