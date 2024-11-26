import { useState } from "react";

// ÍCONOS.
import FontAwesome from "@expo/vector-icons/FontAwesome";

// PROVEEDOR DE CONTEXTO.
import { useAuthContext } from "@/context-providers/AuthContextProvider";

// CLASES AUXILIARES.
import BackendCaller from "@/auxiliar-classes/BackendCaller";
import { Pressable } from "react-native";

// TERMINADO.
export default function LikeButton({ postID, likes, fetchFeed }) {
    const { userID, token } = useAuthContext();

    // Indica si se dio like al post.
    const [likeIsGived, setLikeIsGived] = useState(likes.includes(userID));

    // Ícono que se muestra dependiendo si se dio like o no al post.
    const [icon, setIcon] = useState(!likeIsGived ? <FontAwesome name="heart-o" size={24} color="black" /> : <FontAwesome name="heart" size={24} color="black" />);

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
        <Pressable onPress={() => {
            if (!likeIsGived) {
                handleGiveLike();
                setIcon(<FontAwesome name="heart" size={24} color="black" />)
            } else {
                handleDeleteLike();
                setIcon(<FontAwesome name="heart-o" size={24} color="black" />)
            }
        }}>
            {icon}
        </Pressable>
    );
}