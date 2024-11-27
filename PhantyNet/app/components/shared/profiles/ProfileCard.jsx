import { useEffect, useState } from "react";
import { View, Image, Text } from "react-native";

// PROVEEDORES DE CONTEXTO.
import { useWindowDimensions } from "@/context-providers/WindowDimensionsProvider";

// CLASES AUXILIARES.
import Base64Converter from "@/auxiliar-classes/Base64Converter";

// ESTILOS COMPARTIDOS.
import { createProfileCardStyles } from "@/app/styles/ProfileScreenStyles";

/**
 * Tarjeta de perfil.
 * @param {*} user info de user a desplegarse en el card
 * @param {*} postsQuantity cantidad de posts que el usuario ha hecho para mostrarse en el card
 * @param {*} children prop para manejar children components
 * @estado TERMINADO.
 */
export default function ProfileCard({
    user,
    postsQuantity,
    children
}) {
    // Para estilos.
    const { width, height } = useWindowDimensions();
    const [styles, setStyles] = useState(createProfileCardStyles(width, height));

    useEffect(() => {
        setStyles(createProfileCardStyles(width, height))
    }, [width, height]);

    return (
        <View style={styles.rootView}>
            <View>
                <Image style={styles.profilePicture} source={Base64Converter.checkBase64Image(user.profilePicture) ? { uri: user.profilePicture } : require("../../../../assets/images/default_profile.png")} />
                <Text style={styles.username}>{user.username}</Text>
                <Text style={styles.userInfo}>{user.email}</Text>
                <Text style={styles.userInfo}>{postsQuantity} posts</Text>
                <Text style={styles.userInfo}>
                    Empezó el {new Date(user.createdAt).toLocaleDateString("es-ES", {
                        day: '2-digit',
                        month: 'long',
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