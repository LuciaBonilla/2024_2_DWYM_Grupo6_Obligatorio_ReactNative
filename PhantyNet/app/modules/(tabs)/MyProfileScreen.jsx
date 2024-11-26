import { Link } from "expo-router";
import { Text, View } from "react-native";

import routes from "@/constants/routes";

export default function MyProfileScreen() {
    return (
        <View>
            <Text>
                My PROFILE
                <Link href={routes.LOGIN_ROUTE}>
                    Cerrar sesión
                </Link>
            </Text>
        </View>
    )
}