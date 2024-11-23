import routes from "@/constants/routes";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function MyFeedScreen() {
    return (
        <View>
            <Text>
                My feed
            </Text>
            <Link href={routes.LOGIN_ROUTE}>cerrar sesión</Link>
        </View>
    )
}