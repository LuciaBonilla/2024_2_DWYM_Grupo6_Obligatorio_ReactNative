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
 * @param {*} user Info de user a desplegarse en el card.
 * @param {*} postsQuantity cantidad de posts que el usuario ha hecho para mostrarse en el card.
 * @param {*} children Prop para manejar children components. En MyProfileScreen ponemos botones para editar perfil y cerrar sesión.
 * @estado TERMINADO.
 */
export default function ProfileCard({
    user,
    postsQuantity,
    children
}) {
    // Para estilos dinámicos en base a las dimensiones.
    const { width, height } = useWindowDimensions();
    const [styles, setStyles] = useState(createProfileCardStyles(width, height));

    useEffect(() => {
        setStyles(createProfileCardStyles(width, height))
    }, [width, height]);

    return (
        <View style={styles.rootView}>
            <View>
                {/* Las fotos de perfil están en base64 a excepción de las fotos subidas en posts.*/}
                <Image style={styles.profilePicture} source={Base64Converter.checkBase64Image(user.profilePicture) ? { uri: user.profilePicture } : require("@/assets/images/default_profile.png")} />
                <Text adjustsFontSizeToFit={true} style={styles.username}>{user.username}</Text>
                <Text adjustsFontSizeToFit={true} style={styles.userInfo}>{user.email}</Text>
                <Text adjustsFontSizeToFit={true} style={styles.userInfo}>{postsQuantity} posts</Text>
                <Text adjustsFontSizeToFit={true} style={styles.userInfo}>
                    Empezó el {new Date(user.createdAt).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                    })}
                </Text>
            </View>
            {children}
        </View>
    )
}