import { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, Platform, ScrollView } from "react-native";
import { useFocusEffect } from "expo-router";

// COMPONENTES.
import ImagesContainer from "@/app/components/shared/profiles/ImagesContainer";
import GoToScreenButtonByReplace from "@/app/components/shared/others/GoToScreenButtonByReplace";
import ProfileCard from "@/app/components/shared/profiles/ProfileCard";

// CLASES AUXILIARES.
import BackendCaller from "@/auxiliar-classes/BackendCaller";

// PROVEEDOR DE CONTEXTO.
import { useAuthContext } from "@/context-providers/AuthContextProvider";
import { useWindowDimensions } from "react-native";

// RUTAS.
import routes from "@/constants/routes";
import { SafeAreaView } from "react-native-safe-area-context";

// COLORES.
import { colors } from "@/constants/colors";

/**
 * Screen de mi perfil.
 * @estado componente terminado.
 */
export default function MyProfileScreen() {
  // Para estilos.
  const { width, height } = useWindowDimensions();
  const [styles, setStyles] = useState(createStyles(width, height));

  useEffect(() => {
    setStyles(createStyles(width, height))
  }, [width, height]);

  // Perfil y posts.
  const [userInfo, setUserInfo] = useState();

  // Necesarios para obtener los posts y perfil.
  const { token, userID } = useAuthContext();

  useFocusEffect(
    useCallback(() => {
      const fetchUserInfo = async () => {
        const response = await BackendCaller.getUserProfile(userID, token);
        if (response.statusCode === 200) {
          setUserInfo(response.data);
        }
      };

      fetchUserInfo();
    }, []) // Dependencias para asegurar que se actualice correctamente
  );

  return (
    <SafeAreaView style={styles.rootView}>
      <Text style={styles.socialNetworkTitle}>PhantyNet</Text>
      {userInfo ? (
        <ImagesContainer
          userAuthorPostsID={userInfo.user._id}
          posts={userInfo.posts}
          headerComponentMyProfile={
            <ProfileCard
              user={userInfo.user}
              postsQuantity={userInfo.posts.length}
            >
              <View style={styles.buttonsView}>
                <GoToScreenButtonByReplace
                  route={routes.LOGIN_ROUTE}
                  textContent="CERRAR SESIÓN"
                  buttonStyle={styles.logoutButton}
                  buttonTextStyle={styles.logoutButtonText}
                />
                <GoToScreenButtonByReplace
                  route={routes.MY_PROFILE_EDIT_ROUTE}
                  textContent="EDITAR PERFIL"
                  buttonStyle={styles.editMyProfileButton}
                  buttonTextStyle={styles.editMyProfileButtonText}
                />
              </View>
            </ProfileCard>
          }
        />
      ) : (
        <Text>CARGANDO...</Text>
      )}
    </SafeAreaView>
  );
}

// ESTILOS.
function createStyles(width, height) {
  return StyleSheet.create({
    rootView: {
      flex: 1,
      backgroundColor: colors.background1Color,
      paddingBottom: 80,
    },
    socialNetworkTitle: {
      position: "fixed",
      zIndex: 100,
      top: 0,
      margin: 0,
      padding: 5,
      width: width,
      fontSize: 32,
      textShadowColor: colors.background1Color,
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 4,
      color: colors.primaryColor,
      backgroundColor: colors.secondaryColor,
      textAlign: "center",
      fontFamily: "SegoeBold"
    },
    buttonsView: {
      flex: 1,
      flexDirection: "row",
      columnGap: 5,
      marginVertical: 20,
    },
    editMyProfileButton: {
      backgroundColor: colors.primaryColor,
      width: width * 0.45,
      height: 35,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center"
    },
    editMyProfileButtonText: {
      textAlign: "center",
      fontFamily: "Segoe",
      fontWeight: "bold",
      fontSize: 16,
      color: colors.text1Color,
    },
    logoutButton: {
      backgroundColor: colors.secondaryColor,
      width: width * 0.45,
      height: 35,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center"
    },
    logoutButtonText: {
      textAlign: "center",
      fontFamily: "Segoe",
      fontWeight: "bold",
      fontSize: 16,
      color: colors.whiteFriendlyColor,
    }
  })
};