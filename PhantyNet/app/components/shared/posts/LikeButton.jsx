import { useState } from "react";
import { Pressable } from "react-native";

// ÍCONOS.
import FontAwesome from "@expo/vector-icons/FontAwesome";

// PROVEEDOR DE CONTEXTO.
import { useAuthContext } from "@/context-providers/AuthContextProvider";

// CLASES AUXILIARES.
import BackendCaller from "@/auxiliar-classes/BackendCaller";

// COLORES.
import { colors } from "@/constants/colors";

/**
 * Botón de Like.
 * @param {*} postID prop para pasar post id al cual se desea dar o remover like
 * @param {*} likes cantidad de likes en el post pasado por id
 * @param {*} fetchFeed callback para hacer refresh del feed y mostrar info actualizada
 * @estado TERMINADO.
 */
export default function LikeButton({ postID, likes, fetchFeed }) {
    const { userID, token } = useAuthContext();

    // Indica si se dio like al post.
    const [likeIsGived, setLikeIsGived] = useState(likes.includes(userID));

    // Ícono que se muestra dependiendo si se dio like o no al post.
    const [icon, setIcon] = useState(!likeIsGived ? <FontAwesome name="heart-o" size={32} color={colors.errorColor} /> : <FontAwesome name="heart" size={32} color={colors.errorColor} />);

    /**
     * Da un like al post.
     * @estado función terminada.
     */
    async function handleGiveLike() {
        const response = await BackendCaller.giveLike(postID, token);
        if (response.statusCode === 200) {  // OK
            // Actualiza la info.
            fetchFeed();
            setLikeIsGived(true);
        }
    }

    /**
     * Quita el like a un post.
     * @estado función terminada.
     */
    async function handleDeleteLike() {
        const response = await BackendCaller.deleteLike(postID, token);
        if (response.statusCode === 200) {  // OK
            // Actualiza la info.
            fetchFeed();
            setLikeIsGived(false);
        }
    }

    return (
        <Pressable style={{zIndex: 1000, position: "absolute", bottom: 75, left: 80}} onPress={() => {
            if (!likeIsGived) {
                handleGiveLike();
                setIcon(<FontAwesome name="heart" size={32} color={colors.errorColor} />)
            } else {
                handleDeleteLike();
                setIcon(<FontAwesome name="heart-o" size={32} color={colors.errorColor} />)
            }
        }}>
            {icon}
        </Pressable>
    );
}