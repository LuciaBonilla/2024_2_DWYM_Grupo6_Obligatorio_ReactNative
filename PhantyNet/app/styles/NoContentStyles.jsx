import { StyleSheet } from "react-native";
import colors from "@/constants/colors";

// ESTILOS PARA CUANDO HAY ESPERA O NO HAY CONTENIDO.
export default function createNoContentStyles(width, height) {
    return StyleSheet.create({
        loadingMessage: {
            flex: 1,
            backgroundColor: colors.background1Color,
            fontFamily: "SegoeBold",
            padding: 5,
            fontSize: 32,
            alignSelf: "center",
            color: colors.text1Color,
            height: 40,
        },
        noPostMessage: {
            flex: 1,
            backgroundColor: colors.background1Color,
            fontFamily: "SegoeBold",
            padding: 5,
            fontSize: 16,
            alignSelf: "center",
            color: colors.text1Color,
            height: 40,
        }
    })
};