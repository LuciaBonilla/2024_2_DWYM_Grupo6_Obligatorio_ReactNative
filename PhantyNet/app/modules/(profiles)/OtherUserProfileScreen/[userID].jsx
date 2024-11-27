import { useState, useCallback, useEffect } from "react";
import { Text } from "react-native";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

// COMPONENTES.
import ImagesContainer from "@/app/components/shared/profiles/ImagesContainer";
import ProfileCard from "@/app/components/shared/profiles/ProfileCard";
import GoToPreviousScreenByBack from "@/app/components/shared/others/GoToPreviousScreenByBack";

// CLASES AUXILIARES.
import BackendCaller from "@/auxiliar-classes/BackendCaller";

// PROVEEDOR DE CONTEXTO.
import { useAuthContext } from "@/context-providers/AuthContextProvider";
import { useWindowDimensions } from "react-native";

// ESTILO COMPARTIDO.
import { createProfileScreenStyles } from "@/app/styles/ProfileScreenStyles"
import createNoContentStyles from "@/app/styles/NoContentStyles"

/**
 * Screen de otro perfil.
 * @estado componente terminado.
 */
export default function OtherUserProfileScreen() {
    // ID del usuario.
    const { userID } = useLocalSearchParams();

    // Para estilos.
    const { width, height } = useWindowDimensions();
    const [styles, setStyles] = useState(createProfileScreenStyles(width, height));

    useEffect(() => {
        setStyles(createProfileScreenStyles(width, height))
    }, [width, height]);

    // Perfil y posts.
    const [userInfo, setUserInfo] = useState();

    // Necesarios para obtener los posts y perfil.
    const { token } = useAuthContext();

    useFocusEffect(
        useCallback(() => {
            const fetchUserInfo = async () => {
                const response = await BackendCaller.getUserProfile(userID, token);
                if (response.statusCode === 200) {
                    setUserInfo(response.data);
                }
            };

            fetchUserInfo();
        }, []) // Dependencias para asegurar que se actualice correctamente
    );

    return (
        <SafeAreaView style={styles.rootView}>
            {/* Título. */}
            <Text style={styles.socialNetworkTitle}>PhantyNet</Text>
            {userInfo ? (
                <>
                    {/* Las imágenes que subió el usuario. */}
                    <ImagesContainer
                        userAuthorPostsID={userInfo.user._id}
                        posts={userInfo.posts}
                        headerComponentOtherUserProfile={
                            <ProfileCard
                                user={userInfo.user}
                                postsQuantity={userInfo.posts.length}
                            />
                        }
                    />
                    {/* Para volver una screen hacia atrás. */}
                    <GoToPreviousScreenByBack
                        buttonStyle={styles.goToBackButton}
                        buttonTextStyle={styles.goToBackButtonText}
                        textContent="VOLVER"
                    />
                </>
            ) : (
                <Text style={createNoContentStyles().loadingMessage}>CARGANDO...</Text>
            )}
        </SafeAreaView>
    );
}