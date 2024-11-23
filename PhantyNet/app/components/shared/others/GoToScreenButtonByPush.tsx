import { useRouter } from "expo-router";
import { Pressable, Text, StyleProp, TextStyle, ViewStyle } from "react-native";

interface GoToScreenButtonByPushProps {
    route: string;
    buttonStyle?: StyleProp<ViewStyle>;
    buttonTextStyle?: StyleProp<TextStyle>;
    textContent: string;
}

/**
 * Lleva a una ruta, pero pushea la ruta sobre la anterior.
 * @estado TERMINADO.
 */
export default function GoToScreenButtonByPush({ route, buttonStyle, buttonTextStyle, textContent} : GoToScreenButtonByPushProps) {
    const router = useRouter();

    function handleGoToScreen() {
        router.push(route as any);
    }

    return (
        <Pressable style={buttonStyle} onPress={handleGoToScreen}>
            <Text style={buttonTextStyle}>{textContent}</Text>
        </Pressable>
    )
}