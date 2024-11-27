import React, { useState, useEffect } from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";

//COMPONENTES
import MyProfileCard from "@/app/components/EditMyProfileScreen/MyProfileCard";
import EditMyProfileForm from "@/app/components/EditMyProfileScreen/EditMyProfileForm";
import GoToPreviousScreenByBack from "../../components/shared/others/GoToPreviousScreenByBack";

//PROVEEDORES DE CONTEXTO
import { useAuthContext } from "@/context-providers/AuthContextProvider";
import { useWindowDimensions } from "@/context-providers/WindowDimensionsProvider";

//AUXILIARES
import BackendCaller from "@/auxiliar-classes/BackendCaller";

//COLORES
import { colors } from "@/constants/colors";

/**
 * Screen para edición de perfil del usuario.
 * @estado TERMINADO.
 */
function EditMyProfileScreen() {
    //usado para estilos
    const { width, height } = useWindowDimensions();
    const [styles, setStyles] = useState(createStyles(width, height));

    //estados para mostrar modal de edición, recordar que atributo editar e información de usuario a editar
    const [isShowingEditMyProfileForm, setIsShowingEditMyProfileForm] = useState(false);
    const [attributeToEdit, setAttributeToEdit] = useState(null);
    const [user, setUser] = useState(null);

    //información de usuario logueado y token de auth para llamadas a backend
    const { userID, token } = useAuthContext();

    useEffect(() => {
        setStyles(createStyles(width, height));
    }, [width, height]);

    //llamado a backend para obtener la info del usuario logueado y mostrarla en pantalla
    const fetchMyUser = async () => {
        const response = await BackendCaller.getUserProfile(userID, token);
        if (response?.statusCode === 200) {
            setUser(response.data.user);
        } else {
            setUser(null);
        }
    };

    //fetch de info de usuario a mostrar al ingresar a la página
    useEffect(() => {
        fetchMyUser();
    }, []);

    //Handlers para mostrar y ocultar el form de edición con limpiado de estado
    const handleShowEditMyProfileForm = (attribute) => {
        setAttributeToEdit(attribute);
        setIsShowingEditMyProfileForm(true);
    };

    const handleHideEditMyProfileForm = () => {
        setAttributeToEdit(null);
        setIsShowingEditMyProfileForm(false);
    };

    return (
        <View style={styles.rootView}>
            {/* Condicional para mostrar mensaje de carga si se demora el obtener el usuario de backend */}
            {user ? (
                <>
                    {/* Componente para mostrar info actual de usuario */}
                    <MyProfileCard userData={user} />
                    {/* Botones para determinar que atributo editar y levantar el modal acordemente */}
                    <View style={styles.editionContainer}>
                        <TouchableOpacity 
                            style={styles.editButton} 
                            onPress={() => handleShowEditMyProfileForm("username")}
                        >
                            <Text style={styles.buttonText}>Editar Nombre de Usuario</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.editButton} 
                            onPress={() => handleShowEditMyProfileForm("profilePicture")}
                        >
                            <Text style={styles.buttonText}>Editar Foto de Perfil</Text>
                        </TouchableOpacity>

                        {/* Botón para navegar con back en stack */}
                        <GoToPreviousScreenByBack
                            buttonStyle={styles.backButton}
                            buttonTextStyle={styles.buttonText}
                            textContent="Volver"
                        />
                    </View>
                </>
            ) : (
                <Text style={styles.loadingMessage}>Cargando...</Text>
            )}

            {/* Modal para editar perfil */}
            <Modal
                visible={isShowingEditMyProfileForm}
                animationType="slide"
                transparent={true}
                onRequestClose={handleHideEditMyProfileForm}
            >
                <EditMyProfileForm
                    userData={user}
                    handleHideEditMyProfileForm={handleHideEditMyProfileForm}
                    attributeToEdit={attributeToEdit}
                    fetchMyUser={fetchMyUser}
                />
            </Modal>
        </View>
    );
}

const createStyles = (width, height) => {
    return StyleSheet.create({
        rootView: {
            flex: 1,
            padding: 20,
            backgroundColor: colors.background1Color,
            justifyContent: "center",
            alignItems: "center",
            width,
            height,
        },
        editionContainer: {
            backgroundColor: colors.background1LighterColor,
            borderRadius: 20,
            padding: 20,
            width: "80%",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
        },
        loadingMessage: {
            fontSize: 18,
            color: "#888",
        },
        editButton: {
            backgroundColor: colors.primaryDarkerColor,
            paddingVertical: 14,
            paddingHorizontal: 25,
            borderRadius: 35,
            marginTop: 10,
            width: "100%",
            elevation: 5,
            alignItems: "center",
            justifyContent: "center",
        },
        buttonText: {
            color: "#fff",
            fontSize: 18,
            textAlign: "center",
            fontWeight: "bold",
        },
        backButton: {
            backgroundColor: colors.secondaryColor,
            paddingVertical: 14,
            paddingHorizontal: 25,
            borderRadius: 35,
            marginTop: 15,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",    
        },
    });
};

export default EditMyProfileScreen;
