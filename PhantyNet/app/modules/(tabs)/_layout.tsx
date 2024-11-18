import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs, useNavigation } from "expo-router";
import { useEffect } from "react";

export default function TabLayout() {
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
            <Tabs.Screen
                name="MyFeedScreen"
                options={{
                    title: "Mi Feed",
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="CreatePostScreen"
                options={{
                    title: "Crear Post",
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
                }}
            />
            <Tabs.Screen
                name="MyProfileScreen"
                options={{
                    title: "Mi Perfil",
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
                }}
            />
        </Tabs>
    );
}
