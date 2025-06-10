import { createStackNavigator } from "@react-navigation/stack";
import LandPage from "../public/LandPage";
import LoginPage from "../public/LoginPage";
import SignPage from "../public/SignPage";
import { LightTheme } from "../../styles/global";

const Stack = createStackNavigator();

export default function PublicRoutes() {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerTransparent: true,
                headerTitle: '',
                headerTintColor: LightTheme.primaryText,
            }}
        >
            <Stack.Screen
                name="Home"
                component={LandPage}
            />
            <Stack.Screen
                name="Login"
                component={LoginPage}
            />
            <Stack.Screen
                name="Sign"
                component={SignPage} // Assuming SignPage is similar to LoginPage
            />
        </Stack.Navigator>
    )
}