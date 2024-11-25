import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, Modal, StyleSheet, Image, useWindowDimensions } from "react-native";
import { useAuthContext } from "@/context-providers/AuthContextProvider";
import BackendCaller from "@/auxiliar-classes/BackendCaller";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { User, UserInfo } from "@/constants/types";
import MyProfileCard from "@/app/components/EditMyProfileScreen/MyProfileCard";
import AttributeToEditMenu from "@/app/components/EditMyProfileScreen/AttributeToEditMenu";
import EditMyProfileForm from "@/app/components/EditMyProfileScreen/EditMyProfileForm";


function EditMyProfileScreen() {

    //para estilos y tamaño de pantalla
    const { width, height } = useWindowDimensions();
    const [styles, setStyles] = useState(createStyles(width, height));

    const [isShowingEditMyProfileForm, setIsShowingEditMyProfileForm] = useState(false);
    const [attributeToEdit, setAttributeToEdit] = useState();
    const [user, setUser] = useState<User | null>(null)

    const { userID, token } = useAuthContext();

    //Escucha cambios en orientación de pantalla
    useEffect(() => {
        setStyles(createStyles(width, height))
    }, [width, height]);

    // Obtiene la información del usuario
    const fetchMyUser = async () => {
        const response = await BackendCaller.getUserProfile(userID, token);
        console.log(response?.data);
        if (response?.statusCode == 200) {
            setUser(response.data.user);
        } else {
            setUser(null);
        }
    };

    useEffect(() => {
        fetchMyUser();
    }, []);

    /* // Funciones para manejar la visibilidad del formulario
    const handleShowEditMyProfileForm = (attributeToEdit) => {
        setAttributeToEdit(attributeToEdit);
        setIsShowingEditMyProfileForm(true);
    };

    const handleHideEditMyProfileForm = () => {
        setAttributeToEdit(null);
        setIsShowingEditMyProfileForm(false);
    }; */

    return (
        <View style={styles.container}>
            {user ? (
                <>
                    <Text style={styles.title}>
                        {/* Usando el icono de FontAwesome */}
                        <FontAwesome icon="user-edit" size={24} color="#4A90E2" />
                        EDITAR PERFIL
                    </Text>
                    <MyProfileCard username={user.username} profilePicture={user.profilePicture} />
                </>
            ) : (
                <Text style={styles.loadingMessage}>CARGANDO...</Text>
            )}
        </View>
    );
}

export default EditMyProfileScreen;

function createStyles(width: number, height: number) {
    const isLandscape = width > height;

    return StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
        },
        title: {
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 20,
            textAlign: "center",
            color: "#4A90E2", // Cambia este color si es necesario
        },
        loadingMessage: {
            fontSize: 18,
            color: "#888",
        },
        // Estilo para la tarjeta de perfil
        profileCard: {
            backgroundColor: "#F5F5F5", // Cambia el color de fondo si es necesario
            padding: 20,
            borderRadius: 10,
            alignItems: "center",
            marginBottom: 20,
        },
        profilePicture: {
            width: 100,
            height: 100,
            borderRadius: 50,
            marginBottom: 10,
        },
        username: {
            fontSize: 18,
            fontWeight: "bold",
        },
        // Estilos para el modal y formularios
        formContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
        },
        formBox: {
            width: "80%",
            backgroundColor: "#FFFFFF",
            padding: 20,
            borderRadius: 10,
            justifyContent: "center",
        },
        input: {
            height: 40,
            borderColor: "#ccc",
            borderWidth: 1,
            borderRadius: 5,
            marginBottom: 15,
            paddingLeft: 10,
        },
        cancelButton: {
            backgroundColor: "#FF6F61", // Color de botón de cancelación
            padding: 10,
            borderRadius: 5,
            alignItems: "center",
        },
        okButton: {
            backgroundColor: "#4A90E2", // Color de botón OK
            padding: 10,
            borderRadius: 5,
            alignItems: "center",
        },
        buttonText: {
            color: "#fff",
            fontWeight: "bold",
        },
    });
}