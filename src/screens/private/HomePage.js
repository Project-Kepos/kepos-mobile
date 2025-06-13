import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback, useContext, useEffect, useState } from "react";
import { Icon } from "@rneui/themed";
import { StatusBar } from "expo-status-bar";
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';

import { LightTheme } from "../../styles/global";
import DendroCard from "../../components/DendroCard";
import { AuthContext } from "../../context/AuthContext";
import { getUserDendros } from "../../service/dendroService";

export default function HomePage({ navigation }) {
    const [dendros, setDendros] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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
                <ScrollView refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={getDendros} colors={[LightTheme.secondaryText]} progressBackgroundColor={LightTheme.primaryBG} tintColor={LightTheme.primaryText} title="Atualizando..." titleColor={LightTheme.primaryText}
                    />
                }
                    scrollEventThrottle={16}
                    style={styles.scrollView}>
                    {dendros ? dendros.map((dendro) => (
                        <DendroCard
                            key={dendro.id}
                            dendro={dendro}
                            onPress={() => {
                                console.log(`Dendro ${dendro.id} pressionado`)
                                navigation.navigate("DendroPage", { dendroId: dendro.id })
                            }}
                        />
                    )) : (
                        null
                    )}
                    <TouchableOpacity
                        style={styles.addDendroContainer}
                        onPress={() => navigation.navigate("AddDendro")}>
                        <Icon name="add" size={24} color={LightTheme.primaryText} />
                        <Text style={styles.addDendroText}>Adicionar Estufa</Text>
                    </TouchableOpacity>
                </ScrollView>
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
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
        marginBottom: 20,
    },
    titleText: {
        alignItems: "center",
        justifyContent: 'center',
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
    scrollView: {
        flexGrow: 1,
    },
})