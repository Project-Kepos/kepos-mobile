import { SafeAreaView, StyleSheet } from "react-native";
import { LightTheme } from "../../styles/global";

export default function ProfilePage() {
    return (
        <SafeAreaView style={StyleSheet.safeAreaView}>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: LightTheme.primaryBG,
    },
})