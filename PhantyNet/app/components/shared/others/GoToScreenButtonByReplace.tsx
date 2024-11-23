import { useRouter } from "expo-router";
import { Pressable, Text, StyleProp, TextStyle, ViewStyle } from "react-native";

interface GoToScreenButtonByReplaceProps {
    route: string;
    buttonStyle?: StyleProp<ViewStyle>;
    buttonTextStyle?: StyleProp<TextStyle>;
    textContent: string;
}

/**
 * Lleva a una ruta, pero remplaza la ruta anterior (no push).
 * @estado TERMINADO.
 */
export default function GoToScreenButtonByReplace({ route, buttonStyle, buttonTextStyle, textContent} : GoToScreenButtonByReplaceProps) {
    const router = useRouter();

    function handleGoToScreen() {
        router.replace(route as any);
    }

    return (
        <Pressable style={buttonStyle} onPress={handleGoToScreen}>
            <Text style={buttonTextStyle}>{textContent}</Text>
        </Pressable>
    )
}