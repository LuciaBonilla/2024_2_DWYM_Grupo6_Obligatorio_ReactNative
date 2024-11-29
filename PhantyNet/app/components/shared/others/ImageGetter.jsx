import { StyleSheet, View, Alert, TouchableOpacity, Text, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState, useEffect } from "react";

// PROVEEDORES DE CONTEXTO.
import { useWindowDimensions } from "@/context-providers/WindowDimensionsProvider";

// COLORES.
import colors from "@/constants/colors";

/**
 * Permite seleccionar una imagen con la cámara o con la galería.
 * @param {*} setState Prop para pasar el handler que se encarge de guardar el resultado de elegir imágenes en un estado
 * @param {*} imageValue Prop para pasar el valor de una imagen guardada en estado
 * @estado TERMINADO.
 */
export default function ImageGetter({
    setState,
    imageValue
}) {
    // Para estilos dinámicos en base a las dimensiones.
    const { width, height } = useWindowDimensions();
    const [styles, setStyles] = useState(createStyles(width, height));

    useEffect(() => {
        setStyles(createStyles(width, height))
    }, [width, height]);

    /**
     * Solicitar permisos para la cámara y la galería.
     */
    const requestPermissions = async () => {
        // Permiso para la cámara.
        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
        // Permiso para la galería.
        const libraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (cameraStatus.status !== "granted" || libraryStatus.status !== "granted") {
            Alert.alert("Permiso denegado", "Se necesita acceso a la cámara y a la galería.");
        }
    };

    /**
     * Maneja selección de imagen desde la galería.
     */
    async function handlePickImage() {
        await requestPermissions();  // Solicita los permisos antes de abrir la galería.

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: "images",
            quality: 1,
            allowsEditing: true,
            aspect: [1, 1],
        });

        if (!result.canceled) {
            const image = result.assets ? result.assets[0] : null;
            setState(image);
        } else {
            Alert.alert("Error", "No se seleccionó ninguna imagen.");
        }
    }

    /**
     * Maneja captura de imagen con la cámara.
     */
    async function handleTakePhoto() {
        await requestPermissions();  // Solicita los permisos antes de usar la cámara.

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: "images",
            quality: 1,
            allowsEditing: true,
            aspect: [1, 1],
        });

        if (!result.canceled) {
            const image = result.assets ? result.assets[0] : null;
            setState(image);
        } else {
            Alert.alert("Error", "No se capturó ninguna foto.");
        }
    }

    return (
        <View style={styles.container}>
            {/* Selecciona entre dos opciones. */}
            <TouchableOpacity style={styles.button} onPress={() => handlePickImage()}>
                <Text  adjustsFontSizeToFit={true} style={styles.buttonText}>Seleccionar imagen de la galería</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => handleTakePhoto()}>
                <Text adjustsFontSizeToFit={true} style={styles.buttonText}>Tomar una foto</Text>
            </TouchableOpacity>

            {/* Cajita para mostrar la imagen */}
            <View style={styles.imageBox}>
                {imageValue ? (
                    <Image style={styles.image} source={{ uri: imageValue.uri }} />
                ) : (
                    <Text adjustsFontSizeToFit={true} style={styles.placeholder}>No hay imagen seleccionada</Text>
                )}
            </View>
        </View>
    );
}

// ESTILOS.
function createStyles(width, height) {
    return StyleSheet.create({
        container: {
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
        },
        button: {
            backgroundColor: colors.secondaryColor,
            padding: 12,
            marginVertical: 8,
            borderRadius: 8,
            position: "static",
            justifyContent: "center",
            alignItems: "center",
        },
        buttonText: {
            color: colors.whiteFriendlyColor,
            fontSize: 16,
            fontFamily: "SegoeBold"
        },
        imageBox: {
            width: 200,
            height: 200,
            marginTop: 20,
            borderWidth: 1,
            borderColor: colors.background2Color,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
        },
        image: {
            width: "100%",
            height: "100%",
        },
        placeholder: {
            color: colors.text1Color,
            fontSize: 14,
            textAlign: "center",
            fontFamily: "SegoeBold",
        },
    })
};