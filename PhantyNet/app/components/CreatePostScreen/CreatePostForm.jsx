import { useEffect, useState, useCallback } from "react";
import { StyleSheet, Platform, ScrollView, KeyboardAvoidingView, Text, TouchableOpacity} from "react-native";
import { useRouter, useFocusEffect } from "expo-router";

// COMPONENTES.
import NormalTextInput from "@/app/components/shared/inputs/NormalTextInput";
import ImageGetter from "@/app/components/shared/others/ImageGetter";

// CLASES AUXILIARES.
import BackendCaller from "@/auxiliar-classes/BackendCaller";

// PROVEEDORES DE CONTEXTO.
import { useAuthContext } from "@/context-providers/AuthContextProvider";
import { useWindowDimensions } from "react-native";

// RUTAS.
import routes from "@/constants/routes";

// COLORES.
import colors from "@/constants/colors";

/**
 * Formulario de crear post.
 * @param {*} handleShowUnsuccessfulUploadModal Handler para mostrar modal con resultado de operación no exitosa de upload.
 * @param {*} setUnsuccessfulUploadModalMessage Handler para definir mensaje del modal de operación no exitosa.
 * @estado TERMINADO.
 */
export default function CreatePostForm({
    handleShowUnsuccessfulUploadModal,
    setUnsuccessfulUploadModalMessage
}) {
    // Para estilos dinámicos en base a las dimensiones.
    const { width, height } = useWindowDimensions();
    const [styles, setStyles] = useState(createStyles(width, height));

    useEffect(() => {
        setStyles(createStyles(width, height))
    }, [width, height]);

    // Atributos para crear un post.
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState("");
    const { token } = useAuthContext();

    // Para cambiar de ruta.
    const router = useRouter();

    useFocusEffect(
        useCallback(() => {
            function clearInputs() {
                setImage(null);
                setCaption("");
            }
            clearInputs(); // Llama a la función asincrónica al enfocar la pantalla.
        }, [])) // La dependencia vacía asegura que solo se ejecute al enfocar la screen.

    /**
     * Maneja cancelar subir un post.
     */
    function handleCancelUpload() {
        router.replace(routes.MY_FEED_ROUTE); // Va a mi feed.
    }

    /**
     * Maneja subir un post.
     */
    async function handleUploadPost() {
        if (!image) { // Si no hay imagen...
            setUnsuccessfulUploadModalMessage("No hay imagen"); // Muestra un modal de error.
            handleShowUnsuccessfulUploadModal();
        } else {
            const imageData = {
                uri: image.uri,
                fileType: image.uri.split(".").pop(), // Obtiene el tipo de archivo.
                fileName: image.uri.split("/").pop()  // Extrae el nombre del archivo.
            }
            const response = await BackendCaller.uploadPost(token, imageData, caption);
            if (response.statusCode === 201) { // Created.
                router.replace(routes.MY_PROFILE_ROUTE); // Va mi perfil.
            } else {
                setUnsuccessfulUploadModalMessage(response.data.message); // Muestra un modal de error.
                handleShowUnsuccessfulUploadModal();
            }
        }
    }

    return (
        // Evita que el teclado tape el input a escribir.
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView style={styles.rootView} contentContainerStyle={styles.rootViewConatinerStyle}>
                {/* Parte del input para obtener la imagen. */}
                <ImageGetter
                    setState={setImage}
                    imageValue={image}
                />

                {/* Para la descripción. */}
                <NormalTextInput
                    viewStyle={styles.inputView}
                    inputTitleStyle={styles.inputTitle}
                    inputTitle="DESCRIPCIÓN"
                    inputName="create-post-caption"
                    textInputStyle={styles.textInput}
                    setState={setCaption}
                    value={caption}
                    numberOfLines={15}
                    multiline={true}
                />

                {/* Botones de acción. */}
                <TouchableOpacity style={styles.uploadButton} onPress={handleUploadPost}>
                    <Text adjustsFontSizeToFit={true} style={styles.uploadButtonText}>SUBIR</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={handleCancelUpload}>
                    <Text adjustsFontSizeToFit={true} style={styles.cancelButtonText}>CANCELAR</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

// ESTILOS.
function createStyles(width, height) {
    return StyleSheet.create({
        rootView: {
            flex: 1,
            padding: 10,
            backgroundColor: colors.background1LighterColor,
            flexDirection: "column",
            borderRadius: 10,
            marginBottom: 20,
        },
        rootViewConatinerStyle: {
            alignItems: "center",
            justifyContent: "center",
            rowGap: 20
        },
        inputView: {
            position: "relative",
            width: width * 0.7,
        },
        inputTitle: {
            fontFamily: "SegoeBold",
            fontSize: 16,
            color: colors.text1Color,
            marginBottom: 3,
        },
        textInput: {
            padding: 10,
            borderWidth: 1,
            borderColor: colors.whiteFriendlyDarkerColor,
            borderRadius: 5,
            paddingLeft: 10,
            fontFamily: "SegoeBold",
            color: colors.text1Color,
            backgroundColor: colors.whiteFriendlyColor,
        },
        uploadButton: {
            backgroundColor: colors.primaryColor,
            width: width * 0.5,
            height: 35,
            borderRadius: 10,
            position: "static",
            justifyContent: "center",
            alignItems: "center",
        },
        uploadButtonText: {
            textAlign: "center",
            fontFamily: "SegoeBold",
            fontSize: 16,
            color: colors.text1Color,
        },
        cancelButton: {
            backgroundColor: colors.secondaryColor,
            width: width * 0.5,
            height: 35,
            borderRadius: 10,
            position: "static",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
        },
        cancelButtonText: {
            textAlign: "center",
            fontFamily: "SegoeBold",
            fontSize: 16,
            color: colors.whiteFriendlyColor,
        }
    })
};