import { useRouter } from "expo-router";
import { Pressable, Text } from "react-native";

/**
 * Lleva a una ruta, pero remplaza la ruta anterior (no push).
 * @estado TERMINADO.
 * @param {*} route prop para definir la ruta de destino del boton a navegar
 * @param {*} buttonStyle prop para definir el estilo del boton
 * @param {*} buttonTextStyle prop para definir el estilo del text label del boton
 * @param {*} textContent prop para definir el text del label del boton
 */
export default function GoToScreenButtonByReplace({
    route,
    buttonStyle,
    buttonTextStyle,
    textContent
}) {
    const router = useRouter();

    function handleGoToScreen() {
        router.replace(route);
    }

    return (
        <Pressable style={buttonStyle} onPress={handleGoToScreen}>
            <Text style={buttonTextStyle}>{textContent}</Text>
        </Pressable>
    )
}