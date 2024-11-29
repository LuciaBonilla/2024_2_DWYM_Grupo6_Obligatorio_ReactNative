import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { Image, TouchableOpacity, Text, View } from "react-native";

// COMPONENTES.
import LikeButton from "./LikeButton";
import ShortProfileCard from "@/app/components/shared/profiles/ShortProfileCard";

// RUTAS.
import routes from "@/constants/routes";

// PROVEEDORES DE CONTEXTO.
import { useWindowDimensions } from "@/context-providers/WindowDimensionsProvider";

// ESTILOS COMPARTIDOS.
import createStyles from "@/app/styles/PostScreenStyles";

/**
 * Tarjeta de post.
 * @param {*} id Identificador de post asignado por backend.
 * @param {*} user Datos del usuario relacionado al post.
 * @param {*} imageSrc URI de la imagen publicada en el post.
 * @param {*} caption Caption text que acompaña la imagen en el post.
 * @param {*} likes Cantidad de likes que ha recibido el post.
 * @param {*} createdAt Fecha de creación del post.
 * @param {*} fetchFeed Callback para refrescar el feed de posts tras darse un like.
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
     // Para estilos dinámicos en base a las dimensiones.
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
            <TouchableOpacity onPress={() => handleGoToSpecificPostScreen()}>
                <Image style={styles.uploadedImage} source={{ uri: imageSrc }} />
            </TouchableOpacity>

            {/* Descripción. */}
            <Text adjustsFontSizeToFit={true} style={styles.caption}>{caption}</Text>

            {/* Cantidad de likes y botón de Like */}
            <View style={styles.likesContainer}>
                <Text adjustsFontSizeToFit={true} style={styles.postDataText}>{likes.length} Likes</Text>
                <LikeButton postID={id} likes={likes} fetchFeed={fetchFeed} />
            </View>

            {/* Fecha de publicación. */}
            <Text adjustsFontSizeToFit={true} style={styles.postDataText}>Publicado el{" "}
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