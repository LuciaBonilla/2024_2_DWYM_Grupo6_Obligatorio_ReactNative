import { View, Text, Pressable } from "react-native";

// CLASES AUXILIARES.
import BackendCaller from "@/auxiliar-classes/BackendCaller";

// PROVEEDOR DE CONTEXTO.
import { useAuthContext } from "@/context-providers/AuthContextProvider";

// COMPONENTES.
import ShortProfileCard from "../../profiles/ShortProfileCard";

/**
 * Comentario propio.
 * @estado TERMINADO.
 */
function MyComment({ postID, data, fetchCommentsData }) {
    // Necesario para eliminar comentario.
    const { token } = useAuthContext();

    /**
     * Elimina un comentario propio.
     * @estado función terminada.
     */
    async function handleDeleteComment() {
        const response = await BackendCaller.deleteComment(postID, data._id, token);
        if (response.statusCode === 200) {
            await fetchCommentsData(null, data._id);
        }
    }

    return (
        <View>
            <ShortProfileCard user={data.user} />
            <Text>{data.content}</Text>
            <Text>Publicado el:{" "}
                {new Date(data.createdAt).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "long", // mes completo
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                })}</Text>
            <Pressable onPress={() => handleDeleteComment()}>
                <Text>BORRAR COMENTARIO</Text>
            </Pressable>
        </View>
    );
}

export default MyComment;