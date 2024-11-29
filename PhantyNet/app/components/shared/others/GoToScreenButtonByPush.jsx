import { useRouter } from "expo-router";
import { TouchableOpacity, Text } from "react-native";

/**
 * Lleva a una ruta, pero pushea la ruta sobre la anterior.
 * @param {*} route Prop para definir la ruta de destino del botón a navegar.
 * @param {*} buttonStyle Prop para definir el estilo del botón.
 * @param {*} buttonTextStyle Prop para definir el estilo del text label del botón.
 * @param {*} textContent Prop para definir el text del label del botón.
 * @estado TERMINADO.
 */
export default function GoToScreenButtonByPush({
    route,
    buttonStyle,
    buttonTextStyle,
    textContent
}) {
    const router = useRouter();

    function handleGoToScreen() {
        router.push(route);
    }

    return (
        <TouchableOpacity style={buttonStyle} onPress={handleGoToScreen}>
            <Text adjustsFontSizeToFit={true} style={buttonTextStyle}>{textContent}</Text>
        </TouchableOpacity>
    )
}