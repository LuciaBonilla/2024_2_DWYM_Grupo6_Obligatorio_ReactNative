import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useCallback, useEffect } from "react";

// PROVEEDORES DE CONTEXTO.
import { useAuthContext } from "@/context-providers/AuthContextProvider";
import { useWindowDimensions } from "@/context-providers/WindowDimensionsProvider";

// COMPONENTES.
import PostCard from "@/app/components/shared/posts/PostCard";
import GoToPreviousScreenByBack from "@/app/components/shared/others/GoToPreviousScreenByBack";

// CLASES AUXILIARES.
import BackendCaller from "@/auxiliar-classes/BackendCaller";

// CONSTANTES.
import BACKEND_URI from "@/constants/BACKEND_URI";

// ESTILOS COMPARTIDOS.
import createStyles from "@/app/styles/PostScreenStyles";
import createNoContentStyles from "@/app/styles/NoContentStyles";
import routes from "@/constants/routes";

/**
 * Screen que muestra un post específico.
 * @estado TERMINADO.
 */
export default function SpecificPostScreen() {
    // Para estilos.
    const { width, height } = useWindowDimensions();
    const [styles, setStyles] = useState(createStyles(width, height));

    useEffect(() => {
        setStyles(createStyles(width, height))
    }, [width, height]);

    const { postID } = useLocalSearchParams();

    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const { token } = useAuthContext();

    /**
     * Obtiene el post específico por ID.
     * @estado función terminada.
     */
    async function fetchPost() {
        const response = await BackendCaller.getFeed(token);

        if (response.statusCode === 200) {
            // Filtrar el post específico por su ID.
            const specificPost = response.data.find(post => post._id === postID);
            if (specificPost) {
                setPost(specificPost);
            } else {
                console.error("Post no encontrado");
            }
        } else {
            console.error("Error al cargar el post");
        }
        setIsLoading(false);
    }

    useFocusEffect(
        useCallback(() => {
            if (postID) {
                fetchPost();
            }
            setIsLoading(false);
        }, []) // Dependencias para asegurar que se actualice correctamente
    );

    function handleGoToBack() {
        router.replace(routes.MY_FEED_ROUTE);
    }

    return (
        <SafeAreaView style={styles.rootView}>
            {/* Título */}
            <Text style={styles.socialNetworkTitle}>PhantyNet</Text>
            {!isLoading ? (
                post ? (
                    <>
                        {/* El post*/}
                        <ScrollView style={{paddingTop: 15}}>
                            <PostCard
                                id={post._id}
                                user={post.user}
                                imageSrc={`${BACKEND_URI}/${post.imageUrl.replace("\\", "/")}`}
                                caption={post.caption}
                                likes={post.likes}
                                createdAt={post.createdAt}
                                fetchFeed={fetchPost}
                            />
                        </ScrollView>
                        {/* Para volver una screen hacia atrás. */}
                        <GoToPreviousScreenByBack
                            buttonStyle={styles.goToBackButton}
                            buttonTextStyle={styles.goToBackButtonText}
                            textContent="VOLVER"
                        />
                    </>
                ) : (
                    <Text style={createNoContentStyles().noPostMessage}>Post no encontrado</Text>
                )
            ) : (
                <Text style={createNoContentStyles().loadingMessage}>Cargando...</Text>
            )}
        </SafeAreaView>
    )
}

