import { useRouter } from "expo-router";
import { Pressable, Text } from "react-native";

/**
 * Lleva a una ruta, pero remplaza la ruta anterior (no push).
 * @estado TERMINADO.
 */
export default function GoToScreenButtonByReplace({ route, buttonStyle, buttonTextStyle, textContent}) {
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