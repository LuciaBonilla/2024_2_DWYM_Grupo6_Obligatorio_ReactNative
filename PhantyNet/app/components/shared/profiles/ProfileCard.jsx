import { useEffect, useState } from "react";
import { View, Image, Text, StyleSheet } from "react-native";

// PROVEEDORES DE CONTEXTO.
import { useWindowDimensions } from "@/context-providers/WindowDimensionsProvider";

// COLORES.
import { colors } from "@/constants/colors";

// CLASES AUXILIARES.
import Base64Converter from "@/auxiliar-classes/Base64Converter";

// TERMINADO.
export default function ProfileCard({ user, postsQuantity, children }) {
    // Para estilos.
    const { width, height } = useWindowDimensions();
    const [styles, setStyles] = useState(createStyles(width, height));

    useEffect(() => {
        setStyles(createStyles(width, height))
    }, [width, height]);

    return (
        <View style={styles.rootView}>
            <View>
                <Image source={user.profilePicture === "" ? require("../../../../assets/images/default_profile.png") : Base64Converter.checkBase64Image(user.profilePicture)} />
                <Text style={styles.username}>{user.username}</Text>
                <Text style={styles.userInfo}>{user.email}</Text>
                <Text style={styles.userInfo}>{postsQuantity} posts</Text>
                <Text style={styles.userInfo}>
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

// ESTILOS.
function createStyles(width, height) {
    return StyleSheet.create({
        rootView: {
            backgroundColor: colors.background1LighterColor,
            height: height*0.7,
            padding: 5,
            borderRadius: 10,
            marginTop: 20,
        },
        username: {
            backgroundColor: colors.background1LighterLighterColor,
            textAlign: "center",
            fontSize: 32,
            width: width * 0.8,
            margin: 10,
            bordeRadius: 10,
            fontFamily: "Segoe",
            fontWeight: "bold",
            color: colors.text1Color,
            alignSelf: "center"
        },
        userInfo: {
            textAlign: "center",
            fontSize: 16,
            margin: 10,
            bordeRadius: 10,
            fontFamily: "Segoe",
            fontWeight: "bold",
            color: colors.text1Color,
        }
    })
};