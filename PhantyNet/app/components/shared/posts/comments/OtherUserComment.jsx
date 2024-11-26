import { View, Text } from "react-native";

// COMPONENTES.
import ShortProfileCard from "../../profiles/ShortProfileCard";

/**
 * Comentario de otro usuario
 * @estado TERMINADO.
 */
export default function OtherUserComment({ data }) {
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
        </View>
    );
}