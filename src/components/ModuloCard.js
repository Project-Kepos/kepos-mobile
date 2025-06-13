import { Icon } from "@rneui/base";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LightTheme } from "../styles/global";

export default function ModuloCard({ modulo, onPress }) {
    // Limita o nome a 20 caracteres, adicionando "..." se necessário
    const getLimitedName = (name, limit = 13) => {
        if (!name) return "Desconhecido";
        return name.length > limit ? name.slice(0, limit - 3) + "..." : name;
    };

    return (
        <TouchableOpacity style={styles.touch} onPress={onPress}>
            <View style={styles.mainContainer}>
                <View style={styles.titleContainer}>
                    <View style={styles.IconContainer}>
                        <Icon name={'sprout'} type='material-community'size={30} color={LightTheme.secondaryText} style={styles.icon} />
                        <Text style={styles.Title}>
                            {getLimitedName(modulo?.name)}
                        </Text>
                    </View>
                    <View style={styles.StatusContainer}>
                        <View style={styles.HumidtContainer}>
                            <Icon name={'water-drop'} size={20} color={LightTheme.secondaryText} />
                            <Text style={styles.HumidtText}>
                                {modulo?.humidity !== undefined && modulo?.humidity !== null
                                    ? `${Math.round(modulo?.humidity)}`
                                    : "00"} %
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    touch: {
        marginBottom: 10,
        padding: 20,
        backgroundColor: LightTheme.secondaryBG,
        borderRadius: 10,
        borderColor: LightTheme.secondaryText,
        borderWidth: 1,
    },

    mainContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    IconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    StatusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    TempContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    HumidtContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    icon: {
        marginRight: 5,
    },
    Title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: LightTheme.primaryText,
    },
    TempText: {
        fontSize: 16,
        color: LightTheme.secondaryText,
    },
    HumidtText: {
        fontSize: 16,
        color: LightTheme.secondaryText,
    },


})