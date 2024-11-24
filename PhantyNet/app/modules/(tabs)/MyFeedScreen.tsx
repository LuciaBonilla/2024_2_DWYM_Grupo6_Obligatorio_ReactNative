import routes from "@/constants/routes";
import { Link, useNavigation } from "expo-router";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

export default function MyFeedScreen() {

    const [id, setId] = useState('');
    const navigation = useNavigation();

    return (
        <View>
            <Text>
                My feed

            <TextInput
                placeholder="Ingresa la ID"
                value={id}
                onChangeText={setId}
                keyboardType="numeric"
            />
            <Link
                href={"/modules/OtherUserProfile/[id]".replace('[id]', id)}
            > Ver perfil </Link>
            </Text>
            <Link href={routes.LOGIN_ROUTE}>cerrar sesión</Link>
        </View>
    )
}