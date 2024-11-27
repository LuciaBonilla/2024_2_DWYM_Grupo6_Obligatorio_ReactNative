import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";

// COMPONENTES.
import PostCardContainer from "@/app/components/shared/posts/PostCardContainer";

// PROVEEDORES DE CONTEXTO.
import { useWindowDimensions } from "@/context-providers/WindowDimensionsProvider";

// COLORES.
import { colors } from "@/constants/colors";

export default function MyFeedScreen() {
    // Para estilos.
    const { width, height } = useWindowDimensions();
    const [styles, setStyles] = useState(createStyles(width, height));

    useEffect(() => {
        setStyles(createStyles(width, height))
    }, [width, height]);

    return (
        <SafeAreaView style={styles.rootView}>
            <Text style={styles.socialNetworkTitle}>PhantyNet</Text>
            <PostCardContainer />
        </SafeAreaView>
    )
}

// ESTILOS.
function createStyles(width, height) {
    return StyleSheet.create({
        rootView: {
            flex: 1,
            backgroundColor: colors.background1Color,
            paddingBottom: 50,
        },
        socialNetworkTitle: {
            position: "fixed",
            zIndex: 100,
            top: 0,
            margin: 0,
            padding: 5,
            width: width,
            fontSize: 32,
            textShadowColor: colors.background1Color,
            textShadowOffset: { width: 2, height: 2 },
            textShadowRadius: 4,
            color: colors.primaryColor,
            backgroundColor: colors.secondaryColor,
            textAlign: "center",
            fontFamily: "SegoeBold"
        },
    })
}