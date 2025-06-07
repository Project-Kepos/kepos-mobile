import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LightTheme } from "../../styles/global";
import { StatusBar } from "expo-status-bar";
import DendroCard from "../../components/DendroCard";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getUserDendros } from "../../service/dendroService";
import { Icon } from "@rneui/themed";

export default function HomePage() {
    const { logout } = useContext(AuthContext);
    const [dendros, setDendros] = useState([]);

    const getDendros = useCallback(async () => {
        try {
            const response = await getUserDendros(); // <-- chamada recursiva!
            console.log("Dendros do usuário:", response);
            setDendros(response);
        } catch (error) {
            console.error("Erro ao buscar dendros do usuário:", error);
            if (error.response?.data?.message) {
                console.error(error.response.data.message);
            }
        }
    }, []);

    useEffect(() => {
        getDendros();
        console.log("Dendros carregados:", dendros);
    }, []);

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <StatusBar style="auto" />
            <View style={styles.mainContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Estufas Pareadas</Text>
                </View>
                <ScrollView>
                    {dendros ? dendros.map((dendro) => (
                        <DendroCard
                            key={dendro.id}
                            dendro={dendro}
                            onPress={() => console.log(`Dendro ${dendro.id} pressionado`)}
                        />
                    )) : (
                        <Text style={{ color: LightTheme.secondaryText }}>Nenhum dendro encontrado.</Text>
                    )}
                    <TouchableOpacity
                        style={styles.addDendroContainer}>
                        <Icon name="add" size={24} color={LightTheme.primaryText} />
                        <Text style={styles.addDendroText}>Adicionar Estufa</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            <TouchableOpacity style={{ padding: 10, backgroundColor: LightTheme.secondaryBG, borderRadius: 5, margin: 20 }} onPress={() => logout()}>
                <Text>Deslogar</Text>
            </TouchableOpacity>
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
    },
    titleContainer: {
        marginBottom: 20,
    },
    titleText: {
        fontSize: 24,
        fontWeight: "bold",
        color: LightTheme.primaryText,
    },
    addDendroContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 20,
        backgroundColor: LightTheme.primaryBG,
        borderRadius: 10,
        borderColor: LightTheme.secondaryText,
        borderWidth: 2,
        borderStyle: "dashed",
    },
    addDendroText: {
        marginLeft: 10,
        fontSize: 16,
        color: LightTheme.primaryText,
    },
})