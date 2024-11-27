import { useRouter } from "expo-router";
import { Pressable, Text } from "react-native";

/**
 * Regresa a la pantalla anterior (usando router.back()).
 * @estado TERMINADO.
 * @param {*} buttonStyle props para definir estilo del boton
 * @param {*} buttonTextStyle props para definir el estilo del text label del boton
 * @param {*} textContent prop para el texto del boton
 */
export default function GoToPreviousScreenByBack({
    buttonStyle,
    buttonTextStyle,
    textContent
}) {
    const router = useRouter();

    function handleGoBack() {
        router.back();
    }

    return (
        <Pressable style={buttonStyle} onPress={handleGoBack}>
            <Text style={buttonTextStyle}>{textContent}</Text>
        </Pressable>
    );
}
