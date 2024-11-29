import { useState, useCallback, useEffect } from "react";
import { View, Text } from "react-native";
import { useFocusEffect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

// COMPONENTES.
import ImagesContainer from "@/app/components/shared/profiles/ImagesContainer";
import GoToScreenButtonByReplace from "@/app/components/shared/others/GoToScreenButtonByReplace";
import GoToScreenButtonByPush from "@/app/components/shared/others/GoToScreenButtonByPush";
import ProfileCard from "@/app/components/shared/profiles/ProfileCard";

// CLASES AUXILIARES.
import BackendCaller from "@/auxiliar-classes/BackendCaller";

// PROVEEDOR DE CONTEXTO.
import { useAuthContext } from "@/context-providers/AuthContextProvider";
import { useWindowDimensions } from "react-native";

// RUTAS.
import routes from "@/constants/routes";

// ESTILO COMPARTIDO.
import { createProfileScreenStyles } from "@/app/styles/ProfileScreenStyles";
import createNoContentStyles from "@/app/styles/NoContentStyles"

/**
 * Screen de mi perfil.
 * @estado componente terminado.
 */
export default function MyProfileScreen() {
  // Necesarios para obtener los posts y perfil.
  const { token, userID } = useAuthContext();

  // Para estilos dinámicos en base a las dimensiones.
  const { width, height } = useWindowDimensions();
  const [styles, setStyles] = useState(createProfileScreenStyles(width, height));

  useEffect(() => {
    setStyles(createProfileScreenStyles(width, height))
  }, [width, height]);

  // Perfil y posts.
  const [userInfo, setUserInfo] = useState();

  useFocusEffect(
    useCallback(() => {
      async function fetchUserInfo() {
        const response = await BackendCaller.getUserProfile(userID, token);

        if (response.statusCode === 200) {
          setUserInfo(response.data);
        }
      };

      setUserInfo(); // Necesario para rerenderizar.
      fetchUserInfo();
    }, [])
  );

  return (
    <SafeAreaView style={styles.rootView}>
      {/* Título. */}
      <Text adjustsFontSizeToFit={true} style={styles.socialNetworkTitle}>PhantyNet</Text>
      {userInfo ? (
        // Es una flatlist con el ProfileCard como header.
        <ImagesContainer
          userAuthorPostsID={userInfo.user._id}
          posts={userInfo.posts}
          headerComponentMyProfile={
            // Tarjeta de usuario propio.
            <ProfileCard
              user={userInfo.user}
              postsQuantity={userInfo.posts.length}
            >
              <View style={styles.buttonsView}>
                {/* Botones. El botón de replace no permite que se pueda regresar a la pantalla de my profile. */}
                <GoToScreenButtonByReplace
                  route={routes.LOGIN_ROUTE}
                  textContent="CERRAR SESIÓN"
                  buttonStyle={styles.logoutButton}
                  buttonTextStyle={styles.logoutButtonText}
                />
                <GoToScreenButtonByPush
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
        <>
          <Text adjustsFontSizeToFit={true} style={createNoContentStyles().loadingMessage}>CARGANDO...</Text>
          <GoToScreenButtonByReplace
            route={routes.LOGIN_ROUTE}
            buttonStyle={{ ...styles.goToBackButton, alignSelf: "center", bottom: 300 }}
            buttonTextStyle={styles.goToBackButtonText}
            textContent="VOLVER A HOME"
          />
        </>
      )}
    </SafeAreaView>
  );
}