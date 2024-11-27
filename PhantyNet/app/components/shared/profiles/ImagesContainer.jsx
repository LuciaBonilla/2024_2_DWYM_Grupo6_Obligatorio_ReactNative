import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { Text, FlatList, Pressable, Image, ScrollView } from "react-native";

// BACKEND URI.
import BACKEND_URI from "@/constants/BACKEND_URI";

// PROVEEDOR DE CONTEXTO.
import { useAuthContext } from "@/context-providers/AuthContextProvider";
import { useWindowDimensions } from "@/context-providers/WindowDimensionsProvider";

// RUTAS.
import routes from "@/constants/routes";

// ESTILOS COMPARTIDOS.
import { createImagesContainerStyles } from "@/app/styles/ProfileScreenStyles";
import createNoContentStyles from "@/app/styles/NoContentStyles";

/**
 * Contenedor de imágenes subidas en un perfil.
 * @param {*} userAuthorPostsID
 * @param {*} posts
 * @param {*} headerComponentMyProfile
 * @param {*} headerComponentOtherUserProfile
 * @estado TERMINADO.
 */
export default function ImagesContainer({
    userAuthorPostsID,
    posts,
    headerComponentMyProfile,
    headerComponentOtherUserProfile
}) {
    // Para estilos.
    const { width, height } = useWindowDimensions();
    const [styles, setStyles] = useState(createImagesContainerStyles(width, height));

    useEffect(() => {
        setStyles(createImagesContainerStyles(width, height))
    }, [width, height]);

    const [postsSorted, setPostsSorted] = useState(sortPosts(posts));

    // Para cambiar de ruta.
    const router = useRouter();

    // ID del usuario autenticado.
    const { userID } = useAuthContext();

    function sortPosts(posts) {
        // Ordena los posts por fecha de forma descendente (más recientes primero).
        return posts.sort((post1, post2) => (new Date(post2.createdAt).getTime()) - (new Date(post1.createdAt)).getTime());
    }

    /**
     * Redirige al post de otro usuario al clickear sobre la imagen.
     */
    async function handleGoToSpecificPostScreen(postID) {
        router.push(routes.SPECIFIC_POST_ROUTE.replace("[postID]", postID));
    }

    return (
        (postsSorted.length > 0) ? (
            <FlatList
                contentContainerStyle={styles.list}
                data={postsSorted}
                renderItem={({ item }) => (
                    <Pressable onPress={() => handleGoToSpecificPostScreen(item._id)}>
                        <Image style={styles.image} source={{ uri: `${BACKEND_URI}/${item.imageUrl.replace("\\", "/")}` }} />
                    </Pressable>
                )}
                keyExtractor={item => item._id}
                // Renderiza la header propia o la de otro usuario.
                ListHeaderComponent={(userAuthorPostsID === userID) ? (() => headerComponentMyProfile) : (() => headerComponentOtherUserProfile)}
            />
        ) : (
            <ScrollView>
                {
                    (userAuthorPostsID === userID) ? (
                        headerComponentMyProfile
                    ) : (
                        headerComponentOtherUserProfile
                    )
                }
                <Text style={createNoContentStyles().noPostMessage}>NO HAY POSTS</Text>
            </ScrollView>
        )
    );
}