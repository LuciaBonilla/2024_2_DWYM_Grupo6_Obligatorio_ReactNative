import { useEffect, useState } from "react";
import { Pressable, View, Text } from "react-native";

// COMPONENTES.
import NormalTextInput from "../../inputs/NormalTextInput";

// CLASES AUXILIARES.
import BackendCaller from "@/auxiliar-classes/BackendCaller";

// PROVEEDOR DE CONTEXTO.
import { useAuthContext } from "@/context-providers/AuthContextProvider";

function CommentSectionForm({ postID, fetchCommentsData }) {
    const [content, setContent] = useState("");

    const { token } = useAuthContext();

    async function handleCreateComment() {
        const response = await BackendCaller.createComment(content, postID, token);
        if (response && response.statusCode === 201) {
            const newComment = response.data;

            await fetchCommentsData(newComment, null); // Obtén los comentarios actualizados
            setContent(""); // Limpia el campo de texto.
        }
    }

    return (
        <View>
            <NormalTextInput
                viewStyle={{flex:1}}
                inputTitleStyle={{flex:1}}
                inputTitle=""
                inputName="comment-content"
                textInputStyle={{flex:1}}
                setState={setContent}
                value={content}
            />
            <Pressable onPress={() => handleCreateComment()}>
                <Text>OK</Text>
            </Pressable>
        </View>
    )
}

export default CommentSectionForm;