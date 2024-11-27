import { useRouter } from "expo-router";
import { Pressable, Text } from "react-native";

/**
 * Lleva a una ruta, pero pushea la ruta sobre la anterior.
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
        <Pressable style={buttonStyle} onPress={handleGoToScreen}>
            <Text style={buttonTextStyle}>{textContent}</Text>
        </Pressable>
    )
}