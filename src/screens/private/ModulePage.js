import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "@rneui/base";
import StylizedButton from "../../components/StylizedButton";
import StylizedInput from "../../components/StylizedInput";
import { LightTheme } from "../../styles/global";
import { getModuleById, updateModule, deleteModule } from "../../service/moduleService";

// filepath: c:/Users/Voltage/Documents/Projetos/Kepos/kepos-mobile/kepos-wind/src/screens/private/ModulePage.js


export default function ModulePage({ navigation, route }) {
    const { moduleId } = route.params;
    const [module, setModule] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editValues, setEditValues] = useState({});
    const [error, setError] = useState(null);

    const fetchModule = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await getModuleById(moduleId);
            setModule(data);
            setEditValues({
                name: data.name || "",
                desc: data.desc || "",
            });
        } catch (err) {
            setError(err.message || "Erro ao buscar módulo");
        }
        setIsLoading(false);
    }, [moduleId]);

    useEffect(() => {
        fetchModule();
    }, [fetchModule]);

    const handleEdit = () => setIsEditing(true);

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditValues({
            name: module?.name || "",
            desc: module?.desc || "",
        });
    };

    const handleSaveEdit = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const updated = await updateModule(moduleId, {
                ...module,
                name: editValues.name,
                desc: editValues.desc,
            });
            setModule(updated);
            setIsEditing(false);
        } catch (err) {
            setError(err.message || "Erro ao atualizar módulo");
        }
        setIsLoading(false);
    };

    const handleDelete = async () => {
        Alert.alert(
            "Excluir Módulo",
            "Tem certeza que deseja excluir este módulo?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: async () => {
                        setIsLoading(true);
                        setError(null);
                        try {
                            await deleteModule(moduleId);
                            navigation.goBack();
                        } catch (err) {
                            setError(err.message || "Erro ao excluir módulo");
                        }
                        setIsLoading(false);
                    }
                }
            ]
        );
    };

    if (isLoading) {
        return (
            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.centered}>
                    <ActivityIndicator size="large" color={LightTheme.primaryText} />
                    <Text style={styles.loadingText}>Carregando módulo...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.centered}>
                    <Icon name="error" color="red" size={60} />
                    <Text style={styles.errorText}>{error}</Text>
                    <StylizedButton text="Tentar Novamente" icon="refresh" onPress={fetchModule} />
                    <StylizedButton text="Voltar" icon="arrow-back" onPress={() => navigation.goBack()} />
                </View>
            </SafeAreaView>
        );
    }

    if (!module) {
        return (
            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.centered}>
                    <Text style={styles.errorText}>Módulo não encontrado.</Text>
                    <StylizedButton text="Voltar" icon="arrow-back" onPress={() => navigation.goBack()} />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.mainContainer}>
                    <Text style={styles.title}>Detalhes do Módulo</Text>
                    <View style={styles.iconContainer}>
                        <Icon name="sprout" type="material-community" size={80} color={LightTheme.primaryText} />
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.dataRow}>
                            <View style={styles.dataItem}>
                                <Icon name="water-drop" size={30} color={LightTheme.secondaryText} />
                                <Text style={styles.dataLabel}>Umidade</Text>
                                <Text style={styles.dataValue}>{module.humidity ?? 0}%</Text>
                            </View>
                            <View style={styles.dataItem}>
                                <Icon name="opacity" size={30} color={LightTheme.secondaryText} />
                                <Text style={styles.dataLabel}>Nível</Text>
                                <Text style={styles.dataValue}>{module.humidityLevel ?? 0}</Text>
                            </View>
                        </View>
                        {isEditing ? (
                            <>
                                <StylizedInput
                                    label="Nome"
                                    placeholder="Nome do módulo"
                                    value={editValues.name}
                                    onChangeText={text => setEditValues(v => ({ ...v, name: text }))}
                                    icon="yard"
                                    maxLength={40}
                                />
                                <StylizedInput
                                    label="Descrição"
                                    placeholder="Descrição do módulo"
                                    value={editValues.desc}
                                    onChangeText={text => setEditValues(v => ({ ...v, desc: text }))}
                                    icon="edit-note"
                                    maxLength={100}
                                />
                            </>
                        ) : (
                            <>
                                <Text style={styles.label}>Nome:</Text>
                                <Text style={styles.value}>{module.name}</Text>
                                <Text style={styles.label}>Descrição:</Text>
                                <Text style={styles.value}>{module.desc}</Text>
                            </>
                        )}

                    </View>
                    <View style={styles.btnContainer}>
                        {isEditing ? (
                            <>
                                <StylizedButton text="Salvar" icon="save" onPress={handleSaveEdit} />
                                <StylizedButton text="Cancelar" icon="close" onPress={handleCancelEdit} />
                            </>
                        ) : (
                            <>
                                <StylizedButton text="Editar" icon="edit" onPress={handleEdit} />
                                <StylizedButton text="Excluir" icon="delete" onPress={handleDelete} />
                                <StylizedButton text="Voltar" icon="arrow-back" onPress={() => navigation.goBack()} />
                            </>
                        )}
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
    iconContainer: {
        marginBottom: 20,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: LightTheme.secondaryText,
        borderRadius: 10,
    },
    inputContainer: {
        width: "100%",
        alignItems: "center",
        marginBottom: 20,
    },
    label: {
        color: LightTheme.primaryText,
        fontSize: 16,
        fontWeight: "600",
        marginTop: 10,
        textAlign: "left",
        alignSelf: "flex-start",
    },
    value: {
        color: LightTheme.secondaryText,
        fontSize: 20,
        fontWeight: "400",
        marginBottom: 10,
        alignSelf: "flex-start",
    },
    dataRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        marginTop: 20,
        gap: 10,
    },
    dataItem: {
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: LightTheme.secondaryText,
        borderRadius: 10,
        flex: 1,
        padding: 10,
        marginTop: 10,
    },
    dataLabel: {
        fontSize: 14,
        color: LightTheme.primaryText,
        marginTop: 5,
    },
    dataValue: {
        fontSize: 22,
        color: LightTheme.secondaryText,
        fontWeight: "bold",
        marginTop: 5,
    },
    btnContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
    },
    centered: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    loadingText: {
        color: LightTheme.primaryText,
        fontSize: 18,
        marginTop: 10,
    },
    errorText: {
        color: "red",
        fontSize: 16,
        marginVertical: 10,
        textAlign: "center",
    },
});