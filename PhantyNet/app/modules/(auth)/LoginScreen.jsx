import { useState, useEffect } from "react";
import { Text, Image, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// COMPONENTES.
import LoginForm from "@/app/components/LoginScreen/LoginForm";
import GoToScreenButtonByReplace from "@/app/components/shared/others/GoToScreenButtonByReplace";
import OperationResultModal from "@/app/components/shared/others/OperationResultModal";

// PROVEEDORES DE CONTEXTO.
import { useAuthContext } from "@/context-providers/AuthContextProvider";
import { useWindowDimensions } from "@/context-providers/WindowDimensionsProvider";

// RUTAS.
import routes from "@/constants/routes";

// COLORES.
import colors from "@/constants/colors";

// ÍCONOS.
import FontAwesome from "@expo/vector-icons/FontAwesome";

/**
 * Login Screen.
 * @estado TERMINADO.
 */
export default function LoginScreen() {
    // Para estilos dinámicos en base a las dimensiones.
    const { width, height } = useWindowDimensions();
    const [styles, setStyles] = useState(createStyles(width, height));

    useEffect(() => {
        setStyles(createStyles(width, height))
    }, [width, height]);

    // Indica si el modal de inicio de sesión no exitoso se debe renderizar.
    const [isUnsuccessfulLoginModalShowing, setIsUnsuccessfulLoginModalShowing] = useState(false);

    // Mensaje de modal de inicio de sesión no exitoso.
    const [unsuccessfulLoginMessage, setUnsuccessfulLoginMessage] = useState("");

    /**
     * Muestra el mensaje de inicio de sesión no exitoso.
     */
    function handleShowUnsuccessfulLoginModal() {
        setIsUnsuccessfulLoginModalShowing(true);
    }

    /**
     * Oculta el mensaje de inicio de sesión no exitoso.
     */
    function handleHideUnsuccessfulLoginModal() {
        setIsUnsuccessfulLoginModalShowing(false);
    }

    // Para cerrar sesión.
    const { logout } = useAuthContext();

    useEffect(() => {
        // Cada vez que se renderiza esta screen, entonces se cierra la sesión.
        logout();
    }, []);

    return (
        <SafeAreaView style={styles.rootView}>
            {/* Logo de la red social. */}
            <Image source={require("@/assets/images/logo.png")} style={styles.logo} />

            {/* Nombre de la red social. */}
            <Text adjustsFontSizeToFit={true} style={styles.socialNetworkTitle}>PhantyNet</Text>

            {/* Formulario de login. */}
            <LoginForm
                handleShowUnsuccessfulLoginModal={handleShowUnsuccessfulLoginModal}
                setUnsuccessfulLoginMessage={setUnsuccessfulLoginMessage}
            />

            {/* Botón para ir a la screen de registro. */}
            <GoToScreenButtonByReplace
                route={routes.REGISTER_ROUTE}
                buttonStyle={styles.goToRegisterButton}
                buttonTextStyle={styles.goToRegisterButtonText}
                textContent="CREAR CUENTA"
            />

            {/* Modal en caso de login no exitoso. */}
            <OperationResultModal
                visible={isUnsuccessfulLoginModalShowing}
                message={unsuccessfulLoginMessage}
                modalStyle={styles.errorModal}
                textStyle={styles.errorText}
                icon={<FontAwesome name="user-times" size={128} color={colors.errorColor} style={styles.errorIcon} />}
                buttonStyle={styles.closeErrorModalButton}
                buttonTextStyle={styles.closeErrorModalButtonText}
                buttonText={"CERRAR"}
                handleHideOperationResultModal={handleHideUnsuccessfulLoginModal}
            />
        </SafeAreaView>
    )
}

// ESTILOS.
function createStyles(width, height) {
    return StyleSheet.create({
        rootView: {
            flex: 1,
            backgroundColor: colors.background1Color,
            justifyContent: "center",
            alignItems: "center",
            width,
            height,
            paddingTop: Platform.OS === "android" ? 20 : 0,
        },
        logo: {
            width: width * 0.55,
            height: width * 0.5,
            resizeMode: "contain",
            borderRadius: 100,
            backgroundColor: colors.background2Color,
        },
        socialNetworkTitle: {
            fontFamily: "SegoeBold",
            fontSize: 42,
            textShadowOffset: { width: 2, height: 2 },
            textShadowRadius: 4,
            textShadowColor: colors.shadowColor,
            color: colors.primaryColor,
            marginTop: 5,
            letterSpacing: 2,
            marginBottom: 10,
        },
        goToRegisterButton: {
            width: width * 0.5,
            height: 35,
            borderRadius: 10,
            backgroundColor: colors.secondaryColor,
            position: "static",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20
        },
        goToRegisterButtonText: {
            fontFamily: "SegoeBold",
            fontSize: 16,
            color: colors.whiteFriendlyColor,
        },
        errorModal: {
            backgroundColor: colors.background2Color,
            width: width * 0.9,
            height: height * 0.9,
            paddingHorizontal: 20,
            borderRadius: 10,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        },
        errorText: {
            fontSize: 42,
            textAlign: "center",
            fontFamily: "SegoeBold",
            position: "absolute",
            color: colors.whiteFriendlyColor,
            top: height * 0.2,
            letterSpacing: 1,
        },
        errorIcon: {
            position: "absolute",
            bottom: height * 0.2,
            color: colors.errorColor,
        },
        closeErrorModalButton: {
            width: width * 0.5,
            height: 35,
            position: "absolute",
            borderRadius: 10,
            backgroundColor: colors.errorColor,
            justifyContent: "center",
            alignItems: "center",
            bottom: 20,
        },
        closeErrorModalButtonText: {
            fontFamily: "SegoeBold",
            color: colors.whiteFriendlyColor,
            fontSize: 16,
        }
    });
}