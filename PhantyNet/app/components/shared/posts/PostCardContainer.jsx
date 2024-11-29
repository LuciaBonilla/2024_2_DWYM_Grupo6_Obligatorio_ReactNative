import { useEffect, useState, useCallback } from "react";
import { FlatList, Text } from "react-native";
import { useFocusEffect } from "expo-router";

// BACKEND_URI.
import BACKEND_URI from "@/constants/BACKEND_URI";

// PROVEEDOR DE CONTEXTO.
import { useAuthContext } from "@/context-providers/AuthContextProvider";
import { useWindowDimensions } from "@/context-providers/WindowDimensionsProvider";

// CLASES AUXILIARES.
import BackendCaller from "@/auxiliar-classes/BackendCaller";

// COMPONENTES.
import PostCard from "@/app/components/shared/posts/PostCard";
import GoToScreenButtonByReplace from "@/app/components/shared/others/GoToScreenButtonByReplace";

// ESTILOS COMPARTIDOS.
import createStyles from "@/app/styles/PostScreenStyles";
import createNoContentStyles from "@/app/styles/NoContentStyles";

// RUTAS.
import routes from "@/constants/routes";

/**
 * Contenedor de posts.
 * @estado TERMINADO.
 */
export default function PostCardContainer() {
    // Para estilos dinámicos en base a las dimensiones.
    const { width, height } = useWindowDimensions();
    const [styles, setStyles] = useState(createStyles(width, height));

    useEffect(() => {
        setStyles(createStyles(width, height))
    }, [width, height]);

    // Posts a mostrar.
    const [posts, setPosts] = useState([]);

    // Indica que está cargando.
    const [isLoading, setIsLoading] = useState(true);

    // Necesarios para obtener los posts y filtrar los posts.
    const { token, userID } = useAuthContext();

    /**
     * Dados los posts obtenidos, quita los posts propios del usuario y los restantes los ordena cronológicamente.
     * @param {*} posts
     */
    function getMyFeed(posts) {
        // Filtra los posts para eliminar los del usuario actual.
        const feed = posts.filter((post) => post.user._id !== userID);

        // Ordena los posts por fecha de forma descendente (más recientes primero).
        return feed.sort((post1, post2) => new Date(post2.createdAt).getTime() - new Date(post1.createdAt).getTime());
    }

    /**
     * Obtiene el feed del usuario.
     */
    async function fetchFeed() {
        const response = await BackendCaller.getFeed(token);

        if (response && response.statusCode === 200) { // OK
            setPosts(getMyFeed(response.data));
        }
    }

    useFocusEffect(
        useCallback(() => {
            setPosts([]); // Necesario para rerenderizar.
            fetchFeed();
            setIsLoading(false);
        }, []) // Dependencias para asegurar que se actualice correctamente.
    );

    return (
        !isLoading ? (
            (posts.length > 0) ?
                (
                    <FlatList
                        contentContainerStyle={styles.list}
                        data={posts}
                        renderItem={({ item }) => (
                            <PostCard
                                key={item._id}
                                id={item._id}
                                user={item.user}
                                imageSrc={`${BACKEND_URI}/${item.imageUrl.replace("\\", "/")}`}
                                caption={item.caption}
                                comments={item.comments}
                                likes={item.likes}
                                createdAt={item.createdAt}
                                fetchFeed={fetchFeed}
                            />
                        )}
                        keyExtractor={(item) => item._id}
                    />
                ) : (
                    <Text adjustsFontSizeToFit={true} style={createNoContentStyles().noPostMessage}>NO HAY POSTS</Text>
                )
        ) : (
            <>
                <Text adjustsFontSizeToFit={true} style={createNoContentStyles().loadingMessage}>CARGANDO...</Text>
                <GoToScreenButtonByReplace
                    route={routes.LOGIN_ROUTE}
                    buttonStyle={{ ...styles.goToBackButton, alignSelf: "center", bottom: 300 }}
                    buttonTextStyle={styles.goToBackButtonText}
                    textContent="VOLVER A HOME"
                />
            </>
        )
    );
}