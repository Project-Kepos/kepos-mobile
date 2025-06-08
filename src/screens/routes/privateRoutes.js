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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function PrivateRoutes() {
    return (
        <RootTabs />
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
            <Tab.Screen name="Home" component={HomePage} />
            <Tab.Screen name="Profile" component={ProfilePage} />
        </Tab.Navigator>
    )
}