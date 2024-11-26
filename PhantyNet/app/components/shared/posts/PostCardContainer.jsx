import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

// BACKEND_URI.
import BACKEND_URI from "@/constants/BACKEND_URI";

// PROVEEDOR DE CONTEXTO.
import { useAuthContext } from "@/context-providers/AuthContextProvider";

// CLASES AUXILIARES.
import BackendCaller from "@/auxiliar-classes/BackendCaller";

// COMPONENTES.
import PostCard from "./PostCard";

export default function PostCardContainer() {
    // Posts a mostrar.
    const [posts, setPosts] = useState([]);

    // Indica que está cargando.
    const [isLoading, setIsLoading] = useState(true);

    // Necesarios para obtener los posts y filtrar los posts.
    const { token, userID } = useAuthContext();

    /**
     * Dados los posts obtenidos, quita los posts propios del usuario y los restantes los ordena cronológicamente.
     * @param posts
     * @estado función terminada.
     */
    function getMyFeed(posts) {
        // Filtra los posts para eliminar los del usuario actual.
        const feed = posts.filter((post) => post.user._id !== userID);

        // Ordena los posts por fecha de forma descendente (más recientes primero).
        return feed.sort((post1, post2) => new Date(post2.createdAt).getTime() - new Date(post1.createdAt).getTime());
    }

    /**
     * Obtiene el feed del usuario.
     * @estado función terminada.
     */
    async function fetchFeed() {
        const response = await BackendCaller.getFeed(token);

        if (response && response.statusCode === 200) { // OK
            setPosts(getMyFeed(response.data));
        }
    }

    useEffect(() => {
        fetchFeed();
        setIsLoading(false);
    }, []) // Ejecuta cuando se renderiza el componente.

    return (
        !isLoading ? (
            (posts.length > 0) ?
                (
                    <FlatList
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
                    <Text>NO HAY POSTS</Text>
                )
        ) : (
            <Text>CARGANDO...</Text>
        )
    );
}