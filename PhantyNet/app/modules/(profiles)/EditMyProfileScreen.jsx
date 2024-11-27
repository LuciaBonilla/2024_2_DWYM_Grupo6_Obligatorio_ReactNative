import { useState, useEffect } from "react";
import { View, Text, Button, Modal, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// PROVEEDORES DE CONTEXTO.
import { useAuthContext } from "@/context-providers/AuthContextProvider";
import { useWindowDimensions } from '@/context-providers/WindowDimensionsProvider';

// CLASES AUXILIARES.
import BackendCaller from "@/auxiliar-classes/BackendCaller";

// ÍCONOS.
import FontAwesome from "@expo/vector-icons/FontAwesome";

// COMPONENTES.
import MyProfileCard from "@/app/components/EditMyProfileScreen/MyProfileCard";
import EditMyProfileForm from "@/app/components/EditMyProfileScreen/EditMyProfileForm";
import GoToPreviousScreenByBack from "@/app/components/shared/others/GoToPreviousScreenByBack";

// COLORES.
import { colors } from "@/constants/colors"

/**
 * Screen de editar perfil.
 * @estado TERMINADO.
 */
function EditMyProfileScreen() {
    // Para estilos.
    const { width, height } = useWindowDimensions();
    const [styles, setStyles] = useState(createStyles(width, height));

    useEffect(() => {
        setStyles(createStyles(width, height));
    }, [width, height]);

    // Estados necesarios.
    const [isShowingEditMyProfileForm, setIsShowingEditMyProfileForm] = useState(false);
    const [attributeToEdit, setAttributeToEdit] = useState(null);
    const [user, setUser] = useState(null);

    // Para editar el perfil.
    const { userID, token } = useAuthContext();

    /**
     * Obtiene el usuario propio.
     */
    async function fetchMyUser() {
        const response = await BackendCaller.getUserProfile(userID, token);
        if (response.statusCode === 200) {
            setUser(response.data.user);
        } else {
            setUser(null);
        }
    };

    useEffect(() => {
        fetchMyUser();
    }, []);

    /**
     * Muestra el formulario de editar perfil.
     * @param {*} attribute Atributo a editar (nombre/foto).
     */
    function handleShowEditMyProfileForm(attribute) {
        setAttributeToEdit(attribute);
        setIsShowingEditMyProfileForm(true);
    };

    /**
     * Oculta el formulario de editar perfil.
     */
    function handleHideEditMyProfileForm() {
        setAttributeToEdit(null);
        setIsShowingEditMyProfileForm(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            {user ? (
                <>
                    <Text style={styles.title}>
                        <FontAwesome icon="user-edit" size={24} color="#4A90E2" />
                        EDITAR PERFIL
                    </Text>
                    <MyProfileCard userData={user} />
                    <View style={styles.menu}>
                        <Button title="EDITAR NOMBRE DE USUARIO" onPress={() => handleShowEditMyProfileForm("username")} />
                        <Button title="EDITAR FOTO DE PERFIL" onPress={() => handleShowEditMyProfileForm("profilePicture")} />
                        <GoToPreviousScreenByBack
                            buttonStyle={styles.backButton}
                            buttonTextStyle={styles.backButtonText}
                            textContent="VOLVER"
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
        </SafeAreaView>
    );
}

const createStyles = (width, height) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            width: width,
            height: height,
            rowGap: 5
        },
        title: {
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 20,
            textAlign: "center",
            color: "#4A90E2",
        },
        menu: {
            marginTop: 20,
        },
        loadingMessage: {
            fontSize: 18,
            color: "#888",
        },
        backButton: {
            width: width * 0.5,
            height: 35,
            borderRadius: 10,
            backgroundColor: colors.secondaryColor,
            position: "static",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
            alignSelf: "center",
            marginTop: 30,
        },
        backButtonText: {
            fontFamily: "SegoeBold",
            fontSize: 16,
            color: colors.whiteFriendlyColor,
        }
    });
};

export default EditMyProfileScreen;
