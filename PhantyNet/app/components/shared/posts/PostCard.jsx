import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { Image, Pressable, Text, View, StyleSheet } from "react-native";

// COMPONENTES.
import LikeButton from "./LikeButton";
import ShortProfileCard from "../profiles/ShortProfileCard";
import CommentSection from "./comments/CommentSection";

// RUTAS.
import routes from "@/constants/routes";

// COLORES.
import { colors } from "@/constants/colors";

// PROVEEDORES DE CONTEXTO.
import { useWindowDimensions } from "@/context-providers/WindowDimensionsProvider";

export default function PostCard({ id, user, imageSrc, caption, comments, likes, createdAt, fetchFeed }) {
    // Para estilos.
    const { width, height } = useWindowDimensions();
    const [styles, setStyles] = useState(createStyles(width, height));

    useEffect(() => {
        setStyles(createStyles(width, height))
    }, [width, height]);

    // Indica si la sección de comentarios se debe mostar.
    const [isCommentSectionShowing, setIsCommentSectionShowing] = useState(false);

    /**
     * Muestra la sección de comentarios.
     * @estado función terminada.
     */
    function handleShowCommentSection() {
        setIsCommentSectionShowing(true);
    }

    /**
     * Oculta la sección de comentarios.
     * @estado función terminada.
     */
    function handleHideCommentSection() {
        setIsCommentSectionShowing(false);
    }

    // Para cambiar de ruta.
    const router = useRouter();

    /**
     * Redirige a la page de un post de un usuario ajeno.
     * @estado función terminada.
     */
    function handleGoToOtherUserPostScreen() {
        router.push(routes.OTHER_USER_POST_ROUTE.replace("[id]", id));
    }

    return (
        <View style={styles.postCard}>
            {/* Tarjeta que identifica al usuario autor del post. */}
            <ShortProfileCard user={user} />

            {/* Imagen subida. */}
            <Pressable onPress={() => handleGoToOtherUserPostScreen()}>
                <Image source={{ uri: imageSrc }} />
            </Pressable>


            {/* Descripción. */}
            <Text>{caption}</Text>

            {/* Cantidad de likes. */}
            <Text>{likes.length} Likes</Text>

            {/* Botón para dar like al post. */}
            <LikeButton
                postID={id}
                likes={likes}
                fetchFeed={fetchFeed}
            />

            {/* Cantidad de comentarios. */}
            <Text>{comments.length} Comentarios</Text>

            {/* Fecha de publicación. */}
            <Text>Publicado el:{" "}
                {new Date(createdAt).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "long", // mes completo
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                })}
            </Text>

            {/* Botón para abrir la sección de comentarios. */}
            <Pressable onPress={() => handleShowCommentSection()}>
                <Text>VER COMENTARIOS</Text>
            </Pressable>

            {/* Sección de comentarios. */}
            {isCommentSectionShowing &&
                <CommentSection
                    postID={id}
                    comments={comments}
                    handleHideCommentSection={handleHideCommentSection}
                    fetchFeed={fetchFeed}
                />}
        </View>
    );
}

// ESTILOS.
function createStyles(width, height) {
    return StyleSheet.create({
        postCard: {
            position: "relative",
            flexDirection: "column",
            backgroundColor: colors.background1LighterColor,
            padding: 10,
            borderRadius: 10,
            color: colors.text1Color,
            fontSize: 16,
        },
        uploadedImage: {
            
        }
    })
}