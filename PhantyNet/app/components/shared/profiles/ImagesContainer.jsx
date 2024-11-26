import { useState } from "react";
import { useRouter } from "expo-router";
import { Text, FlatList, View, Pressable, Image } from "react-native";

// BACKEND URI.
import BACKEND_URI from "@/constants/BACKEND_URI";

// PROVEEDOR DE CONTEXTO.
import { useAuthContext } from "@/context-providers/AuthContextProvider";

// RUTAS.
import routes from "@/constants/routes";

// TERMINADO.
export default function ImagesContainer({ userAuthorPostsID, posts }) {
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
     * @estado función terminada.
     */
    function handleGoToOtherUserPostPage(postID) {
        router.push(routes.OTHER_USER_POST_ROUTE.replace('[id]', postID));
    }

    /**
     * Redirige al post propio del usuario al clickear sobre la imagen.
     * @estado función terminada.
     */
    function handleGoToMyPostPage(postID) {
        router.push(routes.MY_POSTS_ROUTE.replace("[id]", postID));
    }

    return (
        (postsSorted.length > 0) ? (
            (userAuthorPostsID === userID) ? (
                // Caso si los posts son del usuario propio.
                <FlatList
                    data={postsSorted}
                    renderItem={({ item }) => (
                        <Pressable onPress={() => handleGoToMyPostPage(item._id)}>
                            <Image source={{ uri: `${BACKEND_URI}/${item.imageUrl.replace("\\", "/")}` }} />
                        </Pressable>
                    )}
                    keyExtractor={item => item._id}
                />
            ) : (
                // Caso si los posts son de otro usuario.
                <FlatList
                    data={postsSorted}
                    renderItem={({ item }) => (
                        <Pressable onPress={() => handleGoToOtherUserPostPage(item._id)}>
                            <Image source={{ uri: `${BACKEND_URI}/${item.imageUrl.replace("\\", "/")}` }} />
                        </Pressable>
                    )}
                    keyExtractor={item => item._id}
                />
            )
        ) : (
            <Text>NO HAY POSTS</Text>
        )
    );
}