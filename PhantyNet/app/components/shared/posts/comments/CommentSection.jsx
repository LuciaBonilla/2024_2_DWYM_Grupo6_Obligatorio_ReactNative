import { useEffect, useState } from "react";
import { ScrollView, View, Text, Pressable, FlatList } from "react-native";

// ÍCONOS.
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

// COMPONENTES.
import OtherUserComment from "./OtherUserComment";
import MyComment from "./MyComment";
import CommentSectionForm from "./CommentSectionForm";

// PROVEEDOR DE CONTEXTO.
import { useAuthContext } from "@/context-providers/AuthContextProvider";

/**
 * Sección de comentarios.
 * @estado TERMINADO.
 */
function CommentSection({ postID, comments, handleHideCommentSection, fetchFeed }) {
    // Para controlar carga.
    const [loading, setLoading] = useState(true);

    // Necesario para obtener comentarios y filtrar los comentarios propios de los ajenos.
    const { userID } = useAuthContext();

    // Comentarios propios y ajenos.
    const [myComments, setMyComments] = useState([]);
    const [otherComments, setOtherComments] = useState([]);

    /**
     * Ordena los comentarios de forma cronológica y los retorna.
     * @param {*} comments
     * @estado función terminada.
     */
    function sortCommentsByDate(comments) {
        // Ordena los comentarios por fecha de forma descendente (más recientes primero).
        return comments.sort((comment1, comment2) => (new Date(comment2.createdAt).getTime()) - (new Date(comment1.createdAt)).getTime());
    }

    /**
     * Obtiene los comentarios.
     * Problema: Agregar comentarios o eliminarlos no se renderizará si se hace un fetch.
     * El estado actual de los comentarios aparecerá si se cierra y abre la sección de comentarios.
     * Solución: Para poner el estado de los comentarios en tiempo real sin cerrar la sección de comentarios,
     * se actualiza de forma local (dentro del componente).
     * 
     * @param {*} newComment
     * @param {*} commentToDeleteID
     * @estado función terminada.
     */
    async function fetchCommentsData(newComment = null, commentToDeleteID = null) {
        // Actualiza el feed de los posts.
        await fetchFeed();

        // Actualiza el estado con los datos obtenidos.
        setMyComments(sortCommentsByDate(comments.filter((comment) => comment.user._id === userID)));
        setOtherComments(sortCommentsByDate(comments.filter((comment) => comment.user._id !== userID)));

        // Agrega el nuevo comentario si existe.
        if (newComment) {
            setMyComments((prevComments) =>
                sortCommentsByDate([...prevComments, newComment])
            );
        }

        // Elimina el comentario si se proporciona un ID para borrar.
        if (commentToDeleteID) {
            setMyComments((prevComments) =>
                prevComments.filter((myComment) => myComment._id !== commentToDeleteID)
            );
        }
    }

    useEffect(() => {
        fetchCommentsData();
        setLoading(false);
    }, []);

    if (loading) {
        return (<Text>CARGANDO...</Text>);
    }

    return (
        <View>
            {/* Botón para cerrar la sección. */}
            <Pressable onPress={() => handleHideCommentSection()}><FontAwesome6 name="xmark" size={24} color="black" /></Pressable>

            {/* Título. */}
            <Text>COMENTARIOS</Text>

            {comments ?
                <>
                    <ScrollView>
                        {/* Mis comentarios. */}
                        {myComments.length > 0 ? (
                                <FlatList
                                    data={myComments}
                                    renderItem={({ item }) => (
                                        <MyComment
                                            key={item._id}
                                            postID={postID} // Necesario para borrar comentario.
                                            data={item}
                                            fetchCommentsData={fetchCommentsData} // Necesario para borrar comentario.
                                        />
                                    )}
                                    keyExtractor={item => item._id}
                                />
                        ) : (
                            <Text>No has comentado</Text>
                        )}

                        {/* Otros comentarios. */}
                        {otherComments.length > 0 ? (
                                <FlatList
                                    data={myComments}
                                    renderItem={({ item }) => (
                                        <OtherUserComment
                                            key={item._id}
                                            data={item}
                                        />
                                    )}
                                    keyExtractor={item => item._id}
                                />
                        ) : (
                            <Text>Otros no han comentado</Text>
                        )}
                    </ScrollView>
                </> : null
            }

            {/* Formulario. */}
            <CommentSectionForm
                postID={postID} // Necesario para crear comentario.
                fetchCommentsData={fetchCommentsData} // Necesario para crear comentario.
            />
        </View>
    );
}

export default CommentSection;