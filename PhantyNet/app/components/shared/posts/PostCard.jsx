import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { Image, Pressable, Text, View } from "react-native";

// COMPONENTES.
import LikeButton from "./LikeButton";
import ShortProfileCard from "../profiles/ShortProfileCard";

// RUTAS.
import routes from "@/constants/routes";

// PROVEEDORES DE CONTEXTO.
import { useWindowDimensions } from "@/context-providers/WindowDimensionsProvider";

// ESTILOS COMPARTIDOS.
import createStyles from "@/app/styles/PostScreenStyles";

/**
 * Tarjeta de post.
 * @param {*} id identificador de post asignado por backend
 * @param {*} user datos del usuario relacionado al post
 * @param {*} imageSrc URI de la imagen publicada en el post 
 * @param {*} caption caption text que acompaña la imagen en el post
 * @param {*} likes cantidad de likes que ha recibido el post
 * @param {*} createdAt fecha de creación del post
 * @param {*} fetchFeed callback para refrescar el feed de posts tras darse un like
 * @estado TERMINADO.
 */
export default function PostCard({
    id,
    user,
    imageSrc,
    caption,
    likes,
    createdAt,
    fetchFeed
}) {
    // Para estilos.
    const { width, height } = useWindowDimensions();
    const [styles, setStyles] = useState(createStyles(width, height));

    useEffect(() => {
        setStyles(createStyles(width, height))
    }, [width, height]);

    // Para cambiar de ruta.
    const router = useRouter();

    /**
     * Redirige a la screen de un post.
     */
    function handleGoToSpecificPostScreen() {
        router.push(routes.SPECIFIC_POST_ROUTE.replace("[postID]", id));
    }

    return (
        <View style={styles.postCard}>
            {/* Tarjeta que identifica al usuario autor del post. */}
            <ShortProfileCard user={user} />

            {/* Imagen subida. */}
            <Pressable onPress={() => handleGoToSpecificPostScreen()}>
                <Image style={styles.uploadedImage} source={{ uri: imageSrc }} />
            </Pressable>

            {/* Descripción. */}
            <Text style={styles.caption}>{caption}</Text>

            {/* Cantidad de likes. */}
            <Text style={styles.postDataText}>{likes.length} Likes</Text>

            {/* Botón para dar like al post. */}
            <LikeButton
                postID={id}
                likes={likes}
                fetchFeed={fetchFeed}
            />

            {/* Fecha de publicación. */}
            <Text style={styles.postDataText}>Publicado el{" "}
                {new Date(createdAt).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                })}
            </Text>
        </View>
    );
}