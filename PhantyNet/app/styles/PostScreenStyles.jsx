import { StyleSheet } from "react-native"
import colors from "@/constants/colors"

// ESTILOS PARA LAS SCREENS CON POST CARDS.
export default function createStyles(width, height) {
    return StyleSheet.create({
        rootView: {
            flex: 1,
            backgroundColor: colors.background1Color,
            paddingBottom: 60,
            alignItems: "center"
        },
        socialNetworkTitle: {
            position: "fixed",
            zIndex: 100,
            top: 0,
            margin: 0,
            padding: 5,
            width: width,
            fontSize: 32,
            textShadowColor: colors.background2Color,
            textShadowOffset: { width: 2, height: 2 },
            textShadowRadius: 4,
            color: colors.primaryColor,
            backgroundColor: colors.secondaryColor,
            textAlign: "center",
            fontFamily: "SegoeBold"
        },
        list: {
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            rowGap: 10,
            marginTop: 20,
            paddingBottom: 30,
            width: width
        },
        postCard: {
            width: width * 0.9,
            flexDirection: "column",
            backgroundColor: colors.background1LighterColor,
            padding: 10,
            borderRadius: 10,
            color: colors.text1Color,
            fontSize: 16,
        },
        caption: {
            backgroundColor: colors.background1LighterLighterColor,
            fontSize: 16,
            color: colors.text1Color,
            fontFamily: "SegoeBold",
            padding: 5,
        },
        uploadedImage: {
            width: width * 0.85,
            height: width * 0.85,
            alignSelf: "center"
        },
        postDataText: {
            fontSize: 16,
            color: colors.text1Color,
            fontFamily: "Segoe",
            fontWeight: "bold",
            padding: 5,
            marginBottom: 10,
        },
        goToBackButton: {
            backgroundColor: colors.primaryColor,
            width: width * 0.5,
            height: 35,
            borderRadius: 10,
            alignSelf: "center",
            justifyContent: "center",
            bottom: -30,
        },
        goToBackButtonText: {
            textAlign: "center",
            fontFamily: "SegoeBold",
            fontSize: 16,
            color: colors.text1Color,
        },
        likesContainer: {
            flexDirection: "row",
            marginVertical: 8,
            paddingHorizontal: 1,
        },
    })
}