import React, { useState } from "react";
import { StyleSheet, View, Alert, Pressable, Text, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

// COLORES.
import { colors } from "@/constants/colors";

interface ImageGetterProps {
    setState: (image: any) => void;
    imageValue: any;
}

export default function ImageGetter({ setState, imageValue }: ImageGetterProps) {
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
        });

        if (!result.canceled) {
            const image = result.assets ? result.assets[0] : null;
            setState(image);
        } else {
            Alert.alert("Error", "No se seleccionó ninguna imagen.");
        }
    }

    /**
     * Maneja captura de imagen con la cámara
     */
    async function handleTakePhoto() {
        await requestPermissions();  // Solicita los permisos antes de usar la cámara.

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: "images",
            quality: 1,
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
            <Pressable style={styles.button} onPress={() => handlePickImage()}>
                <Text style={styles.buttonText}>Seleccionar imagen de la galería</Text>
            </Pressable>

            <Pressable style={styles.button} onPress={() => handleTakePhoto()}>
                <Text style={styles.buttonText}>Tomar una foto</Text>
            </Pressable>

            {/* Cajita para mostrar la imagen */}
            <View style={styles.imageBox}>
                {imageValue ? (
                    <Image source={{ uri: imageValue.uri }} style={styles.image} />
                ) : (
                    <Text style={styles.placeholder}>No hay imagen seleccionada</Text>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
    },
    buttonText: {
        color: colors.whiteFriendlyColor,
        fontSize: 16,
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
        color: colors.whiteFriendlyColor,
        fontSize: 14,
        textAlign: "center",
    },
});