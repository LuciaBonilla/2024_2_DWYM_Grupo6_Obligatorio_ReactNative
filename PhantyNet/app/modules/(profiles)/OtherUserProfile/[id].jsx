import { useLocalSearchParams } from "expo-router";
import { Text, View, StyleSheet, Platform } from "react-native";
import { useEffect, useState } from "react";

// PROVEEDOR DE CONTEXTO.
import { useAuthContext } from "@/context-providers/AuthContextProvider";
import { useWindowDimensions } from "@/context-providers/WindowDimensionsProvider";

// COLORES.
import { colors } from "@/constants/colors";

import BackendCaller from "@/auxiliar-classes/BackendCaller";
import ProfileCard from "@/app/components/OtherUserProfileScreen/ProfileCard";
import ImagesContainer from "@/app/components/OtherUserProfileScreen/ImagesContainer";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OtherUserProfile() {

    //para estilos y tamaño de pantalla
    const { width, height } = useWindowDimensions();
    const [styles, setStyles] = useState(createStyles(width, height));

    //necesario para ruteo dinámico
    const { id } = useLocalSearchParams();

    //necesario para autenticación en llamadas a backend
    const { token } = useAuthContext();

    //necesario para guardar la información del perfil a mostrarse, y manejar errores relacionados
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);

    //Escucha cambios en orientación de pantalla
    useEffect(() => {
        setStyles(createStyles(width, height))
    }, [width, height]);

    //Al montar se encarga en iniciar llamado a backend y manejar respuesta
    useEffect(() => {
        async function fetchUserInfo() {
          if (!id) return;
          try {
            const response = await BackendCaller.getUserProfile(id, token);
            if (response?.statusCode === 200) { // Si la respuesta es exitosa, se actualiza el estado con los datos del usuario
              setUserInfo(response.data);
              setError(null); // Limpiar cualquier error anterior
            } else {
              setError(`Error: ${response?.statusCode} - ${'Could not fetch user info'}`); // Manejo de errores
            }
          } catch (err) {
            // Errores generales
            setError('Error - couldnt connect to backend.');
          }
        }
        fetchUserInfo();
    }, [id, token]);

    
    return (
        <SafeAreaView style={styles.rootView}>
            {/* Componente para mostrar la información del usuario con null control de typescript. */}
            {userInfo?.user ? (
                <ProfileCard user={userInfo?.user} postsQuantity={userInfo?.posts.length}/>
            ):(
                <Text>Something went wrong in card...</Text>
            )}
            {/* Componente para mostrar los posts del usuario con null control de typescript. */}
            {userInfo?.user && userInfo?.posts ? (
                <ImagesContainer
                    userAuthorPostsID={userInfo.user._id}
                    posts={userInfo.posts}
                />
                ) : (
                <Text>Something went wrong in images...</Text>
                )}
        </SafeAreaView>
    )
}

function createStyles(width, height) {
    const isLandscape = width > height;

    return StyleSheet.create({
        rootView: {
            flex: 1,
            backgroundColor: colors.background3Color,
            justifyContent: "flex-start",  
            alignItems: "center",
            width,
            height,
            paddingTop: Platform.OS === "android" ? 20 : 0,
            flexDirection: isLandscape ? "row" : "column",
            paddingHorizontal: 20, 
        },
        avatar: {
            width: width * 0.3,
            height: width * 0.3, 
            borderRadius: (width * 0.3) / 2,
            marginTop: 20,
            marginBottom: 20,
            resizeMode: "cover", 
        },
        errorText: {
            color: colors.errorColor,
            fontSize: 18,
            textAlign: "center",
            marginTop: 20,
        },
    });
}