import { Tabs } from "expo-router";

// ÍCONOS.
import FontAwesome from "@expo/vector-icons/FontAwesome";

// COLORES.
import colors from "@/constants/colors";

/**
 * Tab Layout.
 * @estado TERMINADO.
 */
export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: colors.primaryColor,
            tabBarInactiveTintColor: colors.secondaryColor,
            tabBarStyle: {
                position: "absolute",
                bottom: 0,
                height: 50,
                backgroundColor: colors.background2Color
            },
            tabBarHideOnKeyboard: true, // Esto asegura que el tabBar se oculte cuando el teclado aparece.
        }}>
            <Tabs.Screen
                name="MyFeedScreen"
                options={{
                    title: "Mi Feed",
                    tabBarIcon: ({ color }) => <FontAwesome name="home" size={28} color={color} />,
                    headerShown: false
                }}
            />
            <Tabs.Screen
                name="CreatePostScreen"
                options={{
                    title: "Crear Post",
                    tabBarIcon: ({ color }) => <FontAwesome name="plus-circle" size={28} color={color} />,
                    headerShown: false
                }}
            />
            <Tabs.Screen
                name="MyProfileScreen"
                options={{
                    title: "Mi Perfil",
                    tabBarIcon: ({ color }) => <FontAwesome name="user-circle-o" size={28} color={color} />,
                    headerShown: false
                }}
            />
        </Tabs>
    );
}