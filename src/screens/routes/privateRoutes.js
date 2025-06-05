import { createStackNavigator } from "@react-navigation/stack";
import LandPage from "../public/LandPage";
import LoginPage from "../public/LoginPage";
import SignPage from "../public/SignPage";
import HomePage from "../private/HomePage";

const Stack = createStackNavigator();

export default function PrivateRoutes() {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerTransparent: true,
                headerTitle: '',
            }}
        >
            <Stack.Screen
                name="Home"
                component={HomePage}
            />
        </Stack.Navigator>
    )
}