import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, StyleSheet, Platform } from "react-native";

// COMPONENTES.
import CreatePostForm from "@/app/components/CreatePostScreen/CreatePostForm";
import OperationResultModal from "@/app/components/shared/others/OperationResultModal";

// PROVEEDORES DE CONTEXTO.
import { useWindowDimensions } from "@/context-providers/WindowDimensionsProvider";

// ÍCONOS.
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// COLORES.
import colors from "@/constants/colors";

/**
 * Screen de create post.
 * @estado TERMINADO.
 */
export default function CreatePostScreen() {
    // Para estilos dinámicos en base a las dimensiones.
    const { width, height } = useWindowDimensions();
    const [styles, setStyles] = useState(createStyles(width, height));

    useEffect(() => {
        setStyles(createStyles(width, height))
    }, [width, height]);

    // Indica si el mensaje de subida no exitosa se debe renderizar.
    const [isUnsuccessfulUploadModalShowing, setIsUnsuccessfulUploadModalShowing] = useState(false);

    // Mensaje de modal subida no exitosa.
    const [unsuccessfulUploadModalMessage, setUnsuccessfulUploadModalMessage] = useState("");

    /**
     * Muestra el mensaje de subida no exitosa.
     * @estado función terminada.
     */
    function handleShowUnsuccessfulUploadModal() {
        setIsUnsuccessfulUploadModalShowing(true);
    }

    /**
     * Oculta el mensaje de subida no exitosa.
     * @estado función terminada.
     */
    function handleHideUnsuccessfulUploadModal() {
        setIsUnsuccessfulUploadModalShowing(false);
    }

    return (
        <SafeAreaView style={styles.rootView}>
            {/* Título. */}
            <Text adjustsFontSizeToFit={true} style={styles.title}><Entypo name="circle-with-plus" size={42} color={colors.primaryColor} />SUBIR POST</Text>

            {/* Formulario. */}
            <CreatePostForm
                handleShowUnsuccessfulUploadModal={handleShowUnsuccessfulUploadModal}
                setUnsuccessfulUploadModalMessage={setUnsuccessfulUploadModalMessage}
            />

            {/* Mensaje de subida no exitosa. */}
            <OperationResultModal
                visible={isUnsuccessfulUploadModalShowing}
                message={unsuccessfulUploadModalMessage}
                modalStyle={styles.operationResultModal}
                textStyle={styles.modalText}
                icon={<MaterialIcons name="error" size={128} color={colors.errorColor} style={styles.errorIcon} />}
                buttonStyle={styles.closeErrorModalButton}
                buttonTextStyle={styles.closeModalButtonText}
                buttonText={"CERRAR"}
                handleHideOperationResultModal={handleHideUnsuccessfulUploadModal}
            />
        </SafeAreaView>
    );
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
            paddingBottom: 40,
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
            letterSpacing: 2,
            marginBottom: 10,
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
            fontSize: 32,
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
        closeModalButtonText: {
            color: colors.whiteFriendlyColor,
            fontFamily: "SegoeBold",
            fontSize: 16,
        }
    })
};