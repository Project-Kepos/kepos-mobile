import { StatusBar } from "expo-status-bar";
import { Icon } from "@rneui/base";
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";

import { LightTheme } from "../../styles/global";
import { getDendroById } from "../../service/dendroService";
import ModuloCard from "../../components/ModuloCard";
import { getModulesByDendroId } from "../../service/moduleService";
import StylizedButton from "../../components/StylizedButton";
import { removeUserFromDendro } from "../../service/dendroService";

const { width } = Dimensions.get('window');

export default function DendroPage({ navigation, route }) {
    const { dendroId } = route.params;
    const [dendro, setDendro] = useState(null);
    const [modules, setModules] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getDendroDetails = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await getDendroById(dendroId);
            console.log("Detalhes da estufa:", response);
            setDendro(response);
            setIsLoading(false);
        } catch (error) {
            console.error("Erro ao buscar detalhes da estufa:", error);
            setError(error);
            if (error.response?.data?.message) {
                console.log(error.response.data.message);
            }
            setIsLoading(false);
        }
    }, [dendroId]);

    const getModules = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await getModulesByDendroId(dendroId);
            console.log("Módulos da estufa:", response);
            setModules(response);
            setIsLoading(false);
        } catch (error) {
            console.error("Erro ao buscar módulos da estufa:", error);
            setError(error);
            if (error.response?.data?.message) {
                console.log(error.response.data.message);
            }
            setIsLoading(false);
        }
    }, [dendroId]);

    const handleRemoveDendro = useCallback(async () => {
        setIsLoading(true);
        try {
            await removeUserFromDendro( dendroId );
            setIsLoading(false);
            navigation.goBack();
        } catch (error) {
            console.error("Erro ao desconectar da estufa:", error);
            setError(error);
            setIsLoading(false);
        }
    }, [dendroId]);

    useEffect(() => {
        getDendroDetails();
        console.log("Detalhes da estufa carregados:", dendro);
    }, [getDendroDetails, dendroId])

    useEffect(() => {
        getModules();
        console.log("Módulos carregados:", modules);
    }, [getModules, dendroId]);

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <StatusBar style="auto" />
            <ScrollView refreshControl={
                <RefreshControl refreshing={isLoading} onRefresh={() => {
                    getDendroDetails();
                    getModules();
                }} colors={[LightTheme.secondaryText]} progressBackgroundColor={LightTheme.primaryBG} tintColor={LightTheme.primaryText} title="Atualizando..." titleColor={LightTheme.primaryText}
                />
            }
                scrollEventThrottle={16}
                style={styles.scrollView}>
                <View style={styles.mainContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.NameText}>{dendro?.name}</Text>
                    </View>
                    <View style={styles.dendroDetailsContainer}>
                        <View style={styles.dendroInfo}>

                            <View style={styles.dendroInfoItem}>
                                <Text style={styles.dendroInfoTitle}>Temperatura</Text>
                                <View style={styles.dendroTemperature}>
                                    <Text style={styles.dendroDataText}>
                                        {dendro?.temperature !== undefined && dendro?.temperature !== null
                                            ? Number(dendro.temperature).toFixed(0)
                                            : ""}
                                    </Text>
                                    <Text style={styles.dendroInfoUnity}>C°</Text>
                                </View>
                            </View>

                            <View style={styles.dendroInfoItem}>
                                <Text style={styles.dendroInfoTitle}>Umidade</Text>
                                <View style={styles.dendroHumidity}>
                                    <Text style={styles.dendroDataText}>
                                        {dendro?.humidity !== undefined && dendro?.humidity !== null
                                            ? Number(dendro.humidity).toFixed(0)
                                            : ""}
                                    </Text>
                                    <Text style={styles.dendroInfoUnity}>%</Text>
                                </View>
                            </View>

                            <View style={styles.dendroInfoItem}>
                                <Text style={styles.dendroInfoTitle}>Luminosidade</Text>
                                <View style={styles.dendroLight}>
                                    <Text style={styles.dendroDataText}>
                                        {dendro?.luminosity !== undefined && dendro?.luminosity !== null
                                            ? Number(dendro.luminosity).toFixed(0)
                                            : ""}
                                    </Text>
                                    <Text style={styles.dendroInfoUnity}>Lux</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.titleContainer}>
                        <Text style={styles.moduloText}>Modulos</Text>
                    </View>

                    <View style={styles.dendroModulesContainer}>
                        {modules && modules.length > 0 ? (
                            modules.map((module) => (
                                <ModuloCard
                                    key={module.id}
                                    modulo={module}
                                    onPress={() => {
                                        console.log(`Módulo ${module.id} pressionado`);
                                        navigation.navigate("ModulePage", { moduleId: module.id });
                                    }}
                                />
                            ))
                        ) : (
                            null
                        )}
                        <TouchableOpacity
                            style={styles.addDendroContainer}
                            onPress={() => navigation.navigate("AddModule", { dendroId: dendro.id })}>
                            <Icon name="add" size={24} color={LightTheme.primaryText} />
                            <Text style={styles.addDendroText}>Adicionar Modulo</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.titleContainer}>
                        <Text style={styles.moduloText}>Configurações da Estufa</Text>
                    </View>

                    <View style={styles.configContainer}>
                        <StylizedButton
                            icon={"edit"}
                            text={"Alterar nome da estufa"}
                            onPress={() => navigation.navigate("EditDendroName", { dendroId: dendro.id })}
                        />
                        <StylizedButton
                            icon={"cancel"}
                            text={"Desconectar Estufa"}
                            onPress={handleRemoveDendro}
                            disabled={isLoading}
                        />
                    </View>

                </View>
            </ScrollView>
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
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: LightTheme.primaryText,
    },
    NameText: {
        textAlign: 'left',
        fontSize: 43,
        fontWeight: '300',
        color: LightTheme.secondaryText,
    },
    dendroDetailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 20,
    },
    dendroInfo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    dendroInfoItem: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: LightTheme.secondaryText,
        borderRadius: 10,
        width: width * 0.28,
        height: width * 0.28,
    },
    dendroInfoTitle: {
        textAlign: 'center',
        marginTop: 2,
        fontSize: 12,
        fontWeight: '600',
        color: LightTheme.primaryText,
    },
    dendroDataText: {
        textAlign: 'center',
        fontSize: 40,
        fontWeight: '500',
        color: LightTheme.secondaryText,
    },
    dendroInfoUnity: {
        textAlign: 'center',
        marginBottom: 10,
        marginLeft: 2,
        fontSize: 15,
        color: LightTheme.secondaryText,
    },
    dendroHumidity: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dendroLight: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dendroTemperature: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    moduloText: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: LightTheme.primaryText,
    },
    dendroModulesContainer: {
        flex: 1,
        marginTop: 10,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        minHeight: 290,
    },
    alertText: {
        textAlign: 'center',
        fontSize: 18,
        color: LightTheme.secondaryText,
        margin: 20,
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

    configContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
})