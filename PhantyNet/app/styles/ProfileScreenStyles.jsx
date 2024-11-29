import { StyleSheet } from "react-native";
import colors from "@/constants/colors";

// ESTILOS PARA SCREENS DE PERFILES. HABÍA QUE SEPARARLOS PORQUE DA ERROR.
export function createProfileScreenStyles(width, height) {
    return StyleSheet.create({
        rootView: {
            flex: 1,
            backgroundColor: colors.background1Color,
            paddingBottom: 60,
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
        buttonsView: {
            flex: 1,
            flexDirection: "row",
            columnGap: 5,
            marginVertical: 20,
            justifyContent: "center"
        },
        editMyProfileButton: {
            backgroundColor: colors.primaryColor,
            width: width * 0.45,
            height: 35,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center"
        },
        editMyProfileButtonText: {
            textAlign: "center",
            fontFamily: "SegoeBold",
            fontSize: 16,
            color: colors.text1Color,
        },
        logoutButton: {
            backgroundColor: colors.secondaryColor,
            width: width * 0.40,
            height: 35,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center"
        },
        logoutButtonText: {
            textAlign: "center",
            fontFamily: "SegoeBold",
            fontSize: 16,
            color: colors.whiteFriendlyColor,
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
        }
    })
};

export function createProfileCardStyles(width, height) {
    return StyleSheet.create({
        rootView: {
            backgroundColor: colors.background1LighterColor,
            height: width * 1.4,
            padding: 5,
            borderRadius: 10,
            marginTop: 20,
        },
        profilePicture: {
            width: width * 0.6,
            height: width * 0.6,
            alignSelf: "center",
            borderRadius: 1000,
            marginTop: 5
        },
        username: {
            backgroundColor: colors.background1LighterLighterColor,
            textAlign: "center",
            fontSize: 32,
            width: width * 0.8,
            margin: 10,
            bordeRadius: 10,
            fontFamily: "SegoeBold",
            color: colors.text1Color,
            alignSelf: "center",
            padding: 5
        },
        userInfo: {
            textAlign: "center",
            fontSize: 16,
            margin: 10,
            bordeRadius: 10,
            fontFamily: "SegoeBold",
            color: colors.text1Color,
        }
    })
};

export function createImagesContainerStyles(width, height) {
    return StyleSheet.create({
        list: {
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            rowGap: 10,
        },
        image: {
            width: width * 0.9,
            height: 200,
            borderRadius: 10,
            backgroundColor: colors.background1LighterColor,
        }
    })
};