import { useEffect, useState, useCallback } from "react";
import { Pressable, StyleSheet, Platform, ScrollView, KeyboardAvoidingView, Text } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";

// COMPONENTES.
import TextAreaInput from "../shared/inputs/TextAreaInput";
import ImageGetter from "./ImageGetter";

// CLASES AUXILIARES.
import BackendCaller from "@/auxiliar-classes/BackendCaller";

// PROVEEDOR DE CONTEXTO.
import { useAuthContext } from "@/context-providers/AuthContextProvider";
import { useWindowDimensions } from "react-native";

// RUTAS.
import routes from "@/constants/routes";

// COLORES.
import { colors } from "@/constants/colors";

interface CreatePostFormProps {
    handleShowUnsuccessfulUploadModal: () => void,
    setUnsuccessfulUploadModalMessage: (message: string) => void
}

export default function CreatePostForm({ handleShowUnsuccessfulUploadModal, setUnsuccessfulUploadModalMessage }: CreatePostFormProps) {
    // Para estilos.
    const { width, height } = useWindowDimensions();
    const [styles, setStyles] = useState(createStyles(width, height));

    useEffect(() => {
        setStyles(createStyles(width, height))
    }, [width, height]);

    // Atributos para crear un post.
    const [image, setImage] = useState<any>(null);
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
        }, [])) // La dependencia vacía asegura que solo se ejecute al enfocar.

    function handleCancelUpload() {
        router.replace(routes.MY_FEED_ROUTE);
    }

    async function handleUploadPost() {
        if (!image) { // Si no hay imagen.
            setUnsuccessfulUploadModalMessage("No hay imagen");
            handleShowUnsuccessfulUploadModal();
        } else {
            const imageData = {
                uri: image.uri,
                fileType: image.uri.split('.').pop(), // Obtiene el tipo de archivo.
                fileName: image.uri.split('/').pop()  // Extrae el nombre del archivo.
            }
            const response = await BackendCaller.uploadPost(token, imageData, caption);

            if (response && response.statusCode === 201) { // Created
                router.replace(routes.MY_PROFILE_ROUTE);
            } else {
                if (response?.data.message) {
                    setUnsuccessfulUploadModalMessage(response.data.message);
                }
                handleShowUnsuccessfulUploadModal();
            }
        }
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView style={styles.rootView} contentContainerStyle={styles.rootViewConatinerStyle}>
                {/* Parte del input para obtener la imagen. */}
                <ImageGetter
                    setState={setImage}
                    imageValue={image}
                />

                {/* Para la descripción. */}
                <TextAreaInput
                    viewStyle={styles.inputView}
                    inputTitleStyle={styles.inputTitle}
                    inputTitle="DESCRIPCIÓN"
                    inputName="create-post-caption"
                    textInputStyle={styles.textInput}
                    setState={setCaption}
                    value={caption}
                />

                {/* Botones. */}
                <Pressable style={styles.uploadButton} onPress={() => handleUploadPost()}>
                    <Text style={styles.uploadButtonText}>SUBIR</Text>
                </Pressable>
                <Pressable style={styles.cancelButton} onPress={() => handleCancelUpload()}>
                    <Text style={styles.cancelButtonText}>CANCELAR</Text>
                </Pressable>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

function createStyles(width: number, height: number) {
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
            fontFamily: "Segoe",
            fontWeight: "bold",
            color: colors.text1Color,
            backgroundColor: colors.whiteFriendlyColor
        },
        uploadButton: {
            backgroundColor: colors.primaryColor,
            width: width * 0.5,
            height: 35,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center"
        },
        uploadButtonText: {
            textAlign: "center",
            fontFamily: "Segoe",
            fontWeight: "bold",
            fontSize: 16,
            color: colors.text1Color,
        },
        cancelButton: {
            backgroundColor: colors.secondaryColor,
            width: width * 0.5,
            height: 35,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
        },
        cancelButtonText: {
            textAlign: "center",
            fontFamily: "Segoe",
            fontWeight: "bold",
            fontSize: 16,
            color: colors.whiteFriendlyColor,
        }
    })
};