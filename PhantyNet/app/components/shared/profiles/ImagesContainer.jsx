import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { Text, FlatList, TouchableOpacity, Image, ScrollView } from "react-native";

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
 * @param {*} userAuthorPostsID ID del usuario creador de los posts que se van a mostrar.
 * @param {*} posts Lista de posts que se van a mostrar sus imágenes en el container.
 * @param {*} headerComponentMyProfile Usado para modificar cómo se muestra el header de la list al ser llamado desde MyProfileScreen.
 * @param {*} headerComponentOtherUserProfile Usado para modificar cómo se muestra el header de la list al ser llamado desde OtherUserProfileScreen.
 * @estado TERMINADO.
 */
export default function ImagesContainer({
    userAuthorPostsID,
    posts,
    headerComponentMyProfile,
    headerComponentOtherUserProfile
}) {
    // Para estilos dinámicos en base a las dimensiones.
    const { width, height } = useWindowDimensions();
    const [styles, setStyles] = useState(createImagesContainerStyles(width, height));

    useEffect(() => {
        setStyles(createImagesContainerStyles(width, height))
    }, [width, height]);

    // Posts ordenadors por fecha de subida.
    const [postsSorted, setPostsSorted] = useState(sortPostsByUploadDate(posts));

    // Para cambiar de ruta.
    const router = useRouter();

    // ID del usuario autenticado.
    const { userID } = useAuthContext();

    function sortPostsByUploadDate(posts) {
        // Ordena los posts por fecha de forma descendente (más recientes primero).
        return posts.sort((post1, post2) => (new Date(post2.createdAt).getTime()) - (new Date(post1.createdAt)).getTime());
    }

    /**
     * Maneja redirigir al post al clickear sobre la imagen.
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
                    <TouchableOpacity onPress={() => handleGoToSpecificPostScreen(item._id)}>
                        <Image style={styles.image} source={{ uri: `${BACKEND_URI}/${item.imageUrl.replace("\\", "/")}` }} />
                    </TouchableOpacity>
                )}
                keyExtractor={item => item._id}
                // Renderiza la header propia o la de otro usuario.
                ListHeaderComponent={(userAuthorPostsID === userID) ? (() => headerComponentMyProfile) : (() => headerComponentOtherUserProfile)}
            />
        ) : (
            // Sólo muestra el header.
            <ScrollView>
                {
                    (userAuthorPostsID === userID) ? (
                        headerComponentMyProfile
                    ) : (
                        headerComponentOtherUserProfile
                    )
                }
                <Text adjustsFontSizeToFit={true} style={createNoContentStyles().noPostMessage}>NO HAY POSTS</Text>
            </ScrollView>
        )
    );
}