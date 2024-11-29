import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";

// COMPONENTES.
import PostCardContainer from "@/app/components/shared/posts/PostCardContainer";

// PROVEEDORES DE CONTEXTO.
import { useWindowDimensions } from "@/context-providers/WindowDimensionsProvider";

// ESTILOS COMPARTIDOS.
import createStyles from "@/app/styles/PostScreenStyles"

/**
 * Screen de mi feed.
 * @estado TERMINADO.
 */
export default function MyFeedScreen() {
    // Para estilos.
    const { width, height } = useWindowDimensions();
    const [styles, setStyles] = useState(createStyles(width, height));

    useEffect(() => {
        setStyles(createStyles(width, height))
    }, [width, height]);

    return (
        <SafeAreaView style={styles.rootView}>
            <Text adjustsFontSizeToFit={true} style={styles.socialNetworkTitle}>PhantyNet</Text>
            <PostCardContainer />
        </SafeAreaView>
    )
}