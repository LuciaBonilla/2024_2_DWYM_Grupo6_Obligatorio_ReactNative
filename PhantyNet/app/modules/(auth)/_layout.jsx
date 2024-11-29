import { Slot, useNavigation } from "expo-router";
import { useEffect } from "react";

/**
 * Auth Layout.
 * @estado TERMINADO.
 */
export default function AuthLayout() {
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    return (
        <Slot />
    );
}