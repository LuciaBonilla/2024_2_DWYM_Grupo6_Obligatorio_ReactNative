import { Slot, useNavigation } from "expo-router";
import { useEffect } from "react";

export default function AuthLayout() {
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    return (
        <Slot />
    );
}