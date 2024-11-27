import React, { useState, useEffect } from "react";
import { View, Text, Button, Modal, StyleSheet, useWindowDimensions } from "react-native";
import { useAuthContext } from "@/context-providers/AuthContextProvider";
import BackendCaller from "@/auxiliar-classes/BackendCaller";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { User } from "@/constants/types";
import MyProfileCard from "@/app/components/EditMyProfileScreen/MyProfileCard";
import EditMyProfileForm from "@/app/components/EditMyProfileScreen/EditMyProfileForm";

function EditMyProfileScreen() {
    const { width, height } = useWindowDimensions();
    const [styles, setStyles] = useState(createStyles(width, height));

    const [isShowingEditMyProfileForm, setIsShowingEditMyProfileForm] = useState(false);
    const [attributeToEdit, setAttributeToEdit] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    const { userID, token } = useAuthContext();

    useEffect(() => {
        setStyles(createStyles(width, height));
    }, [width, height]);

    const fetchMyUser = async () => {
        const response = await BackendCaller.getUserProfile(userID, token);
        if (response?.statusCode === 200) {
            setUser(response.data.user);
        } else {
            setUser(null);
        }
    };

    useEffect(() => {
        fetchMyUser();
    }, []);

    const handleShowEditMyProfileForm = (attribute: string) => {
        setAttributeToEdit(attribute);
        setIsShowingEditMyProfileForm(true);
    };

    const handleHideEditMyProfileForm = () => {
        setAttributeToEdit(null);
        setIsShowingEditMyProfileForm(false);
    };

    return (
        <View style={styles.container}>
            {user ? (
                <>
                    <Text style={styles.title}>
                        <FontAwesome icon="user-edit" size={24} color="#4A90E2" />
                        EDITAR PERFIL
                    </Text>
                    <MyProfileCard userData={user} />
                    <View style={styles.menu}>
                        <Button title="Editar Nombre de Usuario" onPress={() => handleShowEditMyProfileForm("username")} />
                        <Button title="Editar Foto de Perfil" onPress={() => handleShowEditMyProfileForm("profilePicture")} />
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

const createStyles = (width: number, height: number) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
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
    });
};

export default EditMyProfileScreen;
