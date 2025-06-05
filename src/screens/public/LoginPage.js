import { StatusBar } from "expo-status-bar";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useContext, useState } from "react";
import * as Yup from 'yup';
import StylizedButton from "../../components/StylizedButton";
import { LightTheme } from "../../styles/global";
import StylizedInput from "../../components/StylizedInput";
import { loginUser } from "../../service/userService";
import { AuthContext } from "../../context/AuthContext";

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Email inválido")
        .required("Email é obrigatório"),
    senha: Yup.string()
        .required("Senha é obrigatória")
})

export default function LoginPage({ navigation }) {
    const {saveToken} = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [errors, setErrors] = useState([
        { email: null },
        { password: null }
    ]);

    const handleLogin = async () => {
        // Reset errors
        setErrors({ email: null, password: null });
        console.log("[Login] Iniciando login com:", { email, senha });

        try {
            // Validate inputs
            await validationSchema.validate({ email, senha }, { abortEarly: false });
            console.log("[Login] Validação bem-sucedida");

            // Call login service
            const response = await loginUser({ email, senha });
            console.log("[Login] Login bem-sucedido, resposta:", response);
            saveToken(response.token);
        } catch (err) {
            if (err.name === "ValidationError") {
                // Collect validation errors
                const newErrors = { email: null, password: null };
                err.inner.forEach(e => {
                    if (e.path === "email") newErrors.email = e.message;
                    if (e.path === "senha") newErrors.password = e.message;
                });
                setErrors(newErrors);
                console.log("[Login] Erros de validação:", newErrors, err.inner);
            } else {
                // Handle login errors
                const loginError = err.response?.data?.message || "Erro ao realizar login";
                setErrors({
                    email: null,
                    password: loginError
                });
                console.log("[Login] Erro ao realizar login:", err, loginError);
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
                            LOGIN
                        </Text>
                    </View>
                    <View style={styles.inputCOntainer}>
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
                            onChangeText={setSenha}
                            errors={errors.password}
                        />
                    </View>
                    <View style={styles.buttonCOntainer}>
                        <StylizedButton
                            text="Entrar"
                            onPress={handleLogin}
                            icon="login"
                        />
                        <StylizedButton
                            text="Não possui uma conta?"
                            onPress={() => navigation.popTo("Sign")}
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
    titleText: {
        fontSize: 30,
        fontWeight: "bold",
        color: LightTheme.primaryText,
    },
})