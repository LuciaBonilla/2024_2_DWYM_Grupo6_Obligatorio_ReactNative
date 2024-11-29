import { useRouter } from "expo-router";
import { TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";

// RUTAS.
import routes from "@/constants/routes";

// CLASES AUXILIARES.
import Base64Converter from "@/auxiliar-classes/Base64Converter";

// PROVEEDOR DE CONTEXTO.
import { useAuthContext } from "@/context-providers/AuthContextProvider";
import { useWindowDimensions } from "@/context-providers/WindowDimensionsProvider";

// COLORES.
import colors from "@/constants/colors";

/**
 * Tarjetita de usuario.
 * @param {*} user Información de user para desplegarse en el card.
 * @estado TERMINADO. 
 */
export default function ShortProfileCard({ user }) {
    // Para estilos dinámicos en base a las dimensiones.
    const { width, height } = useWindowDimensions();
    const [styles, setStyles] = useState(createStyles(width, height));

    useEffect(() => {
        setStyles(createStyles(width, height))
    }, [width, height]);

    const { userID } = useAuthContext();
    const router = useRouter();

    /**
     * Maneja ir al perfil de un usuario.
     */
    function handleGoToUserProfile() {
        if (user._id !== userID) {
            router.push(routes.OTHER_USER_PROFILE_ROUTE.replace("[userID]", user._id)); // Otro perfil.
        } else {
            router.push(routes.MY_PROFILE_ROUTE); // Mi perfil.
        }
    }

    return (
        <TouchableOpacity style={styles.shortCard} onPress={handleGoToUserProfile}>
            <Image style={styles.profilePicture} source={Base64Converter.checkBase64Image(user.profilePicture) ? { uri: user.profilePicture } : require("@/assets/images/default_profile.png")} />
            <Text adjustsFontSizeToFit={true} style={styles.username}>{user._id === userID ? "TÚ" : user.username}</Text>
        </TouchableOpacity>
    );
}

// ESTILOS.
function createStyles(width, height) {
    return StyleSheet.create({
        shortCard: {
            backgroundColor: colors.background1LighterLighterColor,
            flexDirection: "row",
            padding: 5,
            marginBottom: 10,
            borderRadius: 1000
        },
        profilePicture: {
            width: 50,
            height: 50,
            marginRight: 10,
            borderRadius: 1000,
        },
        username: {
            fontFamily: "SegoeBold",
            fontSize: 24,
            textAlign: "center",
            padding: 5,
            textAlignVertical: "center",
            color: colors.text1Color,
        }
    })
}