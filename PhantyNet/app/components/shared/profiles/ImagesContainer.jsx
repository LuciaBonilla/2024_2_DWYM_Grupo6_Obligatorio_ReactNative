import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { Text, FlatList, Pressable, Image, StyleSheet, View } from "react-native";

// BACKEND URI.
import BACKEND_URI from "@/constants/BACKEND_URI";

// PROVEEDOR DE CONTEXTO.
import { useAuthContext } from "@/context-providers/AuthContextProvider";
import { useWindowDimensions } from "@/context-providers/WindowDimensionsProvider";

// RUTAS.
import routes from "@/constants/routes";
import { colors } from "@/constants/colors";

// TERMINADO.
export default function ImagesContainer({ userAuthorPostsID, posts, headerComponentMyProfile, headerComponentOtherUserProfile }) {
    // Para estilos.
    const { width, height } = useWindowDimensions();
    const [styles, setStyles] = useState(createStyles(width, height));

    useEffect(() => {
        setStyles(createStyles(width, height))
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
                    contentContainerStyle={styles.list}
                    data={postsSorted}
                    renderItem={({ item }) => (
                        <Pressable onPress={() => handleGoToMyPostPage(item._id)}>
                            <Image style={styles.image} source={{ uri: `${BACKEND_URI}/${item.imageUrl.replace("\\", "/")}` }} />
                        </Pressable>
                    )}
                    keyExtractor={item => item._id}
                    ListHeaderComponent={() => headerComponentMyProfile}
                />
            ) : (
                // Caso si los posts son de otro usuario.
                <FlatList
                    contentContainerStyle={styles.list}
                    data={postsSorted}
                    renderItem={({ item }) => (
                        <Pressable style={styles.image} onPress={() => handleGoToOtherUserPostPage(item._id)}>
                            <Image source={{ uri: `${BACKEND_URI}/${item.imageUrl.replace("\\", "/")}` }} />
                        </Pressable>
                    )}
                    keyExtractor={item => item._id}
                    ListHeaderComponent={() => headerComponentOtherUserProfile}
                />
            )
        ) : (
            <Text>NO HAY POSTS</Text>
        )
    );
}

// ESTILOS.
function createStyles(width, height) {
    return StyleSheet.create({
        list: {
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            rowGap: 10,
        },
        image: {
            width: width * 0.9,
            height: 200,
            borderRadius: 10,
            backgroundColor: colors.background1LighterColor,
        },
        noPostMessage: {

        }
    })
};