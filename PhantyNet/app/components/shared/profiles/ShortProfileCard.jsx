import { useRouter } from "expo-router";
import { Pressable, View, Image, Text } from "react-native";

// RUTAS.
import routes from "@/constants/routes";

// CLASES AUXILIARES.
import Base64Converter from "@/auxiliar-classes/Base64Converter";

// PROVEEDOR DE CONTEXTO.
import { useAuthContext } from "@/context-providers/AuthContextProvider";

// TERMINADO.
export default function ShortProfileCard({ user }) {
    const { userID } = useAuthContext();

    const router = useRouter();

    function handleGoToUserProfile() {
        if (user._id !== userID) {
            router.push(routes.OTHER_USER_PROFILE_ROUTE.replace("[id]", user._id));
        } else {
            router.push(routes.MY_PROFILE_ROUTE);
        }
    }

    return (
        <Pressable onPress={() => handleGoToUserProfile()}>
                <Image source={user.profilePicture === "" ? require("../../../../assets/images/default_profile.png") : Base64Converter.checkBase64Image(user.profilePicture)}/>
                <Text>{user._id === userID ? "TÚ" : user.username}</Text>
        </Pressable>
    );
}