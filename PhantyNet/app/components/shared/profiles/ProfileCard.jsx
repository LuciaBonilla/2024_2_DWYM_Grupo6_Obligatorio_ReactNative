import { ReactNode } from "react";

// IMAGES.
import { View, Image, Text } from "react-native";

// CLASES AUXILIARES.
import Base64Converter from "@/auxiliar-classes/Base64Converter";

// TERMINADO.
export default function ProfileCard({ user, postsQuantity, children }) {
    return (
        <View>
            <View>
                <Image source={user.profilePicture === "" ? require("../../../../assets/images/default_profile.png") : Base64Converter.checkBase64Image(user.profilePicture)} />
                <Text>{user.username}</Text>
                <Text>{user.email}</Text>
                <Text>{postsQuantity} posts</Text>
                <Text>
                    Empezó el {new Date(user.createdAt).toLocaleDateString("es-ES", {
                        day: '2-digit',
                        month: 'long',  // mes completo, o 'short' para abreviado
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </Text>
            </View>

            {children}
        </View>
    )
}