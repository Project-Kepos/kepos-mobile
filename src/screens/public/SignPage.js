import { StatusBar } from "expo-status-bar";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import * as Yup from 'yup'; // Importando Yup

import StylizedButton from "../../components/StylizedButton";
import { LightTheme } from "../../styles/global";
import StylizedInput from "../../components/StylizedInput";
import { registerUser } from "../../service/userService";

const validationSchema = Yup.object().shape({
    nome: Yup.string()
        .required("Nome de usuário é obrigatório")
        .min(3, "O nome de usuário deve ter pelo menos 3 caracteres"),
    email: Yup.string()
        .email("Email inválido")
        .required("Email é obrigatório"),
    senha: Yup.string()
        .required("Senha é obrigatória")
        .min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('senha'), null], 'As senhas devem corresponder')
        .required("Confirmação de senha é obrigatória")
})

export default function SignPage({ navigation }) {
    const [nome, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([
        { nome: null },
        { email: null },
        { senha: null },
        { confirmPassword: null }
    ]);

    const handleCadastrar = async () => {
        // Reset errors
        setErrors({
            nome: null,
            email: null,
            senha: null,
            confirmPassword: null
        });
        console.log("Iniciando cadastro com:", { nome, email, senha, confirmPassword });

        try {
            // Validate inputs
            await validationSchema.validate(
                { nome, email, senha, confirmPassword },
                { abortEarly: false }
            );
            console.log("Validação dos dados bem-sucedida");

            // Register user
            const data = await registerUser({ nome, email, senha });
            console.log("Cadastro realizado com sucesso:", data);
            navigation.popTo("Login");
        } catch (error) {
            if (error.name === "ValidationError") {
                // Handle validation errors
                const validationErrors = {};
                error.inner.forEach(err => {
                    validationErrors[err.path] = err.message;
                });
                setErrors(validationErrors);
                console.log("Erros de validação:", validationErrors);
            } else {
                // Handle API or network errors
                const apiErrors = {};
                if (error.response && error.response.data) {
                    apiErrors.email = error.response.data.message || "Erro ao cadastrar usuário";
                    console.log("Erro da API:", error.response.data);
                } else {
                    apiErrors.email = "Erro de rede ou servidor";
                    console.log("Erro de rede ou servidor:", error);
                }
                setErrors(apiErrors);
            }
        }
    }
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
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>
                            CADASTRO
                        </Text>
                    </View>
                    <View style={styles.inputCOntainer}>
                        <StylizedInput
                            placeholder="Digite seu nome de usuário"
                            icon="person"
                            autoCapitalize="none"
                            value={nome}
                            onChangeText={setUserName}
                            errors={errors.userName}
                        />
                        <StylizedInput
                            placeholder="Digite seu email"
                            icon="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                            errors={errors.email}
                        />
                        <StylizedInput
                            placeholder="Digite sua senha"
                            icon="lock"
                            secureTextEntry={true}
                            autoCapitalize="none"
                            autoComplete="password"
                            value={senha}
                            onChangeText={setPassword}
                            errors={errors.password}
                        />
                        <StylizedInput
                            placeholder="Confirme sua senha"
                            icon="lock"
                            secureTextEntry={true}
                            autoCapitalize="none"
                            autoComplete="password"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            errors={errors.confirmPassword}
                        />
                    </View>
                    <View style={styles.buttonCOntainer}>
                        <StylizedButton
                            text="Realizar Cadastro"
                            onPress={handleCadastrar}
                            icon="person-add"
                        />
                        <StylizedButton
                            text="Já possui uma conta?"
                            onPress={() => navigation.popTo("Login")}
                            icon="login"
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
    titleText: {
        fontSize: 30,
        fontWeight: "bold",
        color: LightTheme.primaryText,
    },
})