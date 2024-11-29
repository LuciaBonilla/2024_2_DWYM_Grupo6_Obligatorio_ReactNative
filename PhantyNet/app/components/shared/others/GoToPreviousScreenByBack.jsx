import { useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

/**
 * Regresa a la pantalla anterior (usando router.back()).
 * @param {*} buttonStyle Props para definir estilo del botón.
 * @param {*} buttonTextStyle Props para definir el estilo del text label del botón.
 * @param {*} textContent Prop para el texto del botón.
 * @estado TERMINADO.
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
        <TouchableOpacity style={buttonStyle} onPress={handleGoBack}>
            <Text adjustsFontSizeToFit={true} style={buttonTextStyle}>{textContent}</Text>
        </TouchableOpacity>
    );
}
