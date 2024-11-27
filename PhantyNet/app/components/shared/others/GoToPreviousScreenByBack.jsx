import { useRouter } from "expo-router";
import { Pressable, Text } from "react-native";

/**
 * Regresa a la pantalla anterior (usando router.back()).
 * @estado TERMINADO.
 */
export default function GoToPreviousScreenByBack({ buttonStyle, buttonTextStyle, textContent }) {
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
