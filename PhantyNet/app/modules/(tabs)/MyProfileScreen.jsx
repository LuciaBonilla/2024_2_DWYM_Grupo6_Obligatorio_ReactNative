import { useState, useCallback } from "react";
import { View, Text } from "react-native";
import { Link } from "expo-router";

// COMPONENTES.
import ImagesContainer from "@/app/components/shared/profiles/ImagesContainer";
import GoToScreenButtonByReplace from "@/app/components/shared/others/GoToScreenButtonByReplace";
import ProfileCard from "@/app/components/shared/profiles/ProfileCard";

// CLASES AUXILIARES.
import BackendCaller from "@/auxiliar-classes/BackendCaller";

// PROVEEDOR DE CONTEXTO.
import { useAuthContext } from "@/context-providers/AuthContextProvider";

// RUTAS.
import routes from "@/constants/routes";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "expo-router";

/**
 * Screen de mi perfil.
 * @estado componente terminado.
 */
export default function MyProfileScreen() {
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
    <SafeAreaView style={{ flex: 1 }}>
      <Text>PhantyNet</Text>
      {userInfo ? (
        <>
          <ProfileCard
            user={userInfo.user}
            postsQuantity={userInfo.posts.length}
          >
            <View className="profile-card__buttons">
              <GoToScreenButtonByReplace
                route={routes.LOGIN_ROUTE}
                textContent="CERRAR SESIÓN"
              />
              <GoToScreenButtonByReplace
                route={routes.MY_PROFILE_EDIT_ROUTE}
                textContent="EDITAR PERFIL"
              />
            </View>
          </ProfileCard>

          <ImagesContainer
            userAuthorPostsID={userInfo.user._id}
            posts={userInfo.posts}
          />
        </>
      ) : (
        <Text>
          CARGANDO...
          <Link href={routes.LOGIN_ROUTE}>Volver a home</Link>
        </Text>
      )}
    </SafeAreaView>
  );
}
