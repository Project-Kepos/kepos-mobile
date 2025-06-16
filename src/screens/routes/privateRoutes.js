import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
// Corrigido aqui
import LandPage from "../public/LandPage";
import LoginPage from "../public/LoginPage";
import SignPage from "../public/SignPage";
import HomePage from "../private/HomePage";
import { LightTheme } from '../../styles/global';
import ProfilePage from '../private/ProfilePage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AddDendroPage from '../private/AddDendroPage';
import DendroPage from '../private/DendroPage';
import EditDendroNamePage from '../private/EditDendroNamePage';
import AddModulePage from '../private/AddModulePage';
import ModulePage from '../private/ModulePage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function PrivateRoutes() {
    return (
        <GestureHandlerRootView>
            <RootTabs />
        </GestureHandlerRootView>
    )
}

function RootTabs() {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = 'home';
                    } else if (route.name === 'Profile') {
                        iconName = 'account';
                    }
                    return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: LightTheme.secondaryText,
                tabBarInactiveTintColor: LightTheme.secondaryText,
                tabBarStyle: {
                    backgroundColor: LightTheme.primaryBG,
                    borderTopWidth: 2,
                    borderColor: LightTheme.secondaryText,
                },
                headerTransparent: true,
                headerTitle: '',
            })}
        >
            <Tab.Screen name="Home" component={MainStack} />
            <Tab.Screen name="Profile" component={ProfilePage} />
        </Tab.Navigator>
    )
}

function MainStack() {
    return (
        <Stack.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerTransparent: true,
                headerTitle: '',
                headerTintColor: LightTheme.primaryText,
            }}
        >
            <Stack.Screen name="Home" component={HomePage} />
            <Stack.Screen name="AddDendro" component={AddDendroPage} />
            <Stack.Screen name="DendroPage" component={DendroPage} />
            <Stack.Screen name="EditDendroName" component={EditDendroNamePage} />
            <Stack.Screen name="AddModule" component={AddModulePage} />
            <Stack.Screen name="ModulePage" component={ModulePage} />
        </Stack.Navigator>
    )
}