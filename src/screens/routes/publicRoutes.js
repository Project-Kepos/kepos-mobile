import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "../public/HomePage";

const Stack = createStackNavigator();

export default function PublicRoutes() {
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