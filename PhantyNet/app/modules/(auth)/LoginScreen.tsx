import LoginForm from "@/app/components/LoginScreen/LoginForm";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Image />
            <Text>PhantyNet</Text>
            <LoginForm
                handleShowUnsuccessfulLoginModal={() => null}
                setUnsuccessfulLoginMessage={() => null}
            />
        </SafeAreaView>
    )
}