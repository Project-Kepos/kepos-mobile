import { StyleSheet, Text, View } from 'react-native';
import { AuthContext, AuthContextProvider } from './src/context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { useContext } from 'react';
import PublicRoutes from './src/screens/routes/publicRoutes';

export default function App() {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <Routes />
        </NavigationContainer>
    </AuthContextProvider>
  );
}

function Routes() {
  const { token } = useContext(AuthContext);
  return <PublicRoutes />
}
