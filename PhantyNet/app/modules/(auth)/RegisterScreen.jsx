import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, StyleSheet, Platform } from "react-native";

// ÍCONOS.
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';

// COMPONENTES.
import RegisterForm from "@/app/components/RegisterScreen/RegisterForm";
import GoToScreenButtonByReplace from "@/app/components/shared/others/GoToScreenButtonByReplace";
import OperationResultModal from "@/app/components/shared/others/OperationResultModal";

// PROVEEDOR DE CONTEXTO.
import { useAuthContext } from "@/context-providers/AuthContextProvider";
import { useWindowDimensions } from "@/context-providers/WindowDimensionsProvider";

// RUTAS.
import routes from "@/constants/routes";

// COLORES.
import colors from "@/constants/colors";

/**
 * Register Screen.
 * @estado TERMINADO.
 */
export default function RegisterScreen() {
    // Para estilos dinámicos en base a las dimensiones.
    const { width, height } = useWindowDimensions();
    const [styles, setStyles] = useState(createStyles(width, height));

    useEffect(() => {
        setStyles(createStyles(width, height))
    }, [width, height]);

    // Indica si el modal de registro no exitoso se debe renderizar.
    const [isUnsuccessfulRegisterModalShowing, setIsUnsuccessfulRegisterModalShowing] = useState(false);

    // Indica si el modal de registro exitoso se debe renderizar.
    const [isSuccessfulRegisterModalShowing, setIsSuccessfulRegisterModalShowing] = useState(false);

    // Mensaje de modal de registro no exitoso.
    const [unsuccessfulRegisterModalMessage, setUnsuccessfulRegisterModalMessage] = useState("");

    // Mensaje de modal de registro exitoso.
    const [successfulRegisterModalMessage, setSuccessfulRegisterModalMessage] = useState("");

    /**
     * Muestra el modal de registro no exitoso.
     */
    function handleShowUnsuccessfulRegisterModal() {
        setIsUnsuccessfulRegisterModalShowing(true);
    }

    /**
     * Oculta el modal de registro no exitoso.
     */
    function handleHideUnsuccessfulRegisterModal() {
        setIsUnsuccessfulRegisterModalShowing(false);
    }

    /**
     * Muestra el modal de registro exitoso.
     */
    function handleShowSuccessfulRegisterModal() {
        setIsSuccessfulRegisterModalShowing(true);
    }

    /**
     * Oculta el modal de registro exitoso.
     */
    function handleHideSuccessfulRegisterModal() {
        setIsSuccessfulRegisterModalShowing(false);
    }

    // Para cerrar sesión.
    const { logout } = useAuthContext();

    useEffect(() => {
        // Cada vez que se renderiza esta screen, entonces se cierra la sesión.
        logout();
    }, []);

    return (
        <SafeAreaView style={styles.rootView}>
            {/* Título. */}
            <Text adjustsFontSizeToFit={true} style={styles.title}><FontAwesome name="user" size={42} color={colors.primaryColor} />CREAR CUENTA</Text>

            {/* Formulario de registro. */}
            <RegisterForm
                handleShowUnsuccessfulRegisterModal={handleShowUnsuccessfulRegisterModal}
                setUnsuccessfulRegisterModalMessage={setUnsuccessfulRegisterModalMessage}
                handleShowSuccessfulRegisterModal={handleShowSuccessfulRegisterModal}
                setSuccessfulRegisterModalMessage={setSuccessfulRegisterModalMessage}
            />

            {/* Botón para ir a la screen de login. */}
            <GoToScreenButtonByReplace
                route={routes.LOGIN_ROUTE}
                buttonStyle={styles.goToLoginButton}
                buttonTextStyle={styles.goToLoginButtonText}
                textContent="INICIAR SESIÓN"
            />

            {/* Modal en caso de registro no exitoso. */}
            <OperationResultModal
                visible={isUnsuccessfulRegisterModalShowing}
                message={unsuccessfulRegisterModalMessage}
                modalStyle={styles.operationResultModal}
                textStyle={styles.modalText}
                icon={<MaterialIcons name="error" size={128} color={colors.errorColor} style={styles.errorIcon} />}
                buttonStyle={styles.closeErrorModalButton}
                buttonTextStyle={styles.closeModalButtonText}
                buttonText={"CERRAR"}
                handleHideOperationResultModal={handleHideUnsuccessfulRegisterModal}
            />

            
            <OperationResultModal
                visible={isSuccessfulRegisterModalShowing}
                message={successfulRegisterModalMessage}
                modalStyle={styles.operationResultModal}
                textStyle={styles.modalText}
                icon={<Feather name="user-check" size={128} color={colors.successColor} style={styles.successIcon} />}
                buttonStyle={styles.closeSuccessModalButton}
                buttonTextStyle={styles.closeModalButtonText}
                buttonText={"OK"}
                handleHideOperationResultModal={handleHideSuccessfulRegisterModal}
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
        title: {
            fontSize: 32,
            textAlign: "center",
            padding: 5,
            color: colors.primaryColor,
            fontFamily: "SegoeBold",
            textShadowOffset: { width: 2, height: 2 },
            textShadowRadius: 4,
            textShadowColor: colors.shadowColor,
            marginTop: 5,
            letterSpacing: 1,
            marginBottom: 10,
        },
        goToLoginButton: {
            width: width * 0.5,
            height: 35,
            borderRadius: 10,
            backgroundColor: colors.secondaryColor,
            position: "static",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
            marginTop: 10,
        },
        goToLoginButtonText: {
            fontFamily: "SegoeBold",
            fontWeight: "bold",
            fontSize: 16,
            color: colors.whiteFriendlyColor,
        },
        operationResultModal: {
            backgroundColor: colors.background2Color,
            width: width * 0.9,
            height: height * 0.9,
            paddingHorizontal: 20,
            borderRadius: 10,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        },
        modalText: {
            fontSize: 42,
            textAlign: "center",
            fontFamily: "SegoeBold",
            position: "absolute",
            color: colors.whiteFriendlyColor,
            top: height * 0.2,
        },
        errorIcon: {
            position: "absolute",
            bottom: height * 0.2,
            color: colors.errorColor,
        },
        successIcon: {
            position: "absolute",
            bottom: height * 0.2,
            color: colors.successColor,
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
        closeSuccessModalButton: {
            width: width * 0.5,
            height: 35,
            position: "absolute",
            borderRadius: 10,
            backgroundColor: colors.successColor,
            justifyContent: "center",
            alignItems: "center",
            bottom: 20,
        },
        closeModalButtonText: {
            fontFamily: "SegoeBold",
            color: colors.whiteFriendlyColor,
            fontSize: 16,
        }
    })
};