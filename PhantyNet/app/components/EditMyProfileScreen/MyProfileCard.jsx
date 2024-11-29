import { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

// PROVEEDORES DE CONTEXTO.
import { useWindowDimensions } from "react-native";

// COLORES.
import colors from "@/constants/colors";

/**
 * Tarjeta propia de usuario (sale al editar perfil).
 * @param {*} userData Data de usuario logueado en el card.
 * @estado TERMINADO.
 */
export default function MyProfileCard({ userData }) {
  // Para estilos dinámicos en base a las dimensiones.
  const { width, height } = useWindowDimensions();
  const [styles, setStyles] = useState(createStyles(width, height));

  useEffect(() => {
    setStyles(createStyles(width, height))
  }, [width, height]);

  // Se setea imageUri de la imagen de perfil custom del usuario o se usa la imagen default si no está seteada.
  const defaultPhoto = require("@/assets/images/default_profile.png");
  const imageUri = userData.profilePicture
    ? { uri: userData.profilePicture }
    : defaultPhoto;

  return (
    <View style={styles.profileCard}>
      {/* Profile info. */}
      <View style={styles.profileCardInfo}>
        {/* Profile header. */}
        <View style={styles.profileCardHeader}>
          <Image source={imageUri} style={styles.profileCardImg} />
          <View style={styles.profileCardTextContainer}>
            <Text adjustsFontSizeToFit={true} style={styles.profileCardUsername}>{userData.username}</Text>
          </View>
        </View>

        {/* Demás info. */}
        <Text adjustsFontSizeToFit={true} style={styles.profileCardEmail}>{userData.email}</Text>
        <Text adjustsFontSizeToFit={true} style={styles.profileCardCreatedAt}>
          Miembro desde {new Date(userData.createdAt).toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </View>
    </View>
  );
};

// ESTILOS.
function createStyles(width, height) {
  return StyleSheet.create({
    profileCard: {
      backgroundColor: colors.whiteFriendlyColor,
      borderRadius: 10,
      margin: 10,
      padding: 15,
      shadowColor: colors.shadowColor,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      flexDirection: "column",
    },
    profileCardInfo: {
      alignItems: "center",
    },
    profileCardHeader: {
      flexDirection: "row",
      alignItems: "center",
    },
    profileCardImg: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 10,
      marginRight: 10,
    },
    profileCardTextContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    profileCardUsername: {
      fontSize: 20,
      fontFamily: "SegoeBold",
      fontWeight: "bold",
      color: colors.text1Color,
      marginBottom: 5,
    },
    profileCardEmail: {
      fontSize: 16,
      color: colors.text1Color,
      marginBottom: 5,
    },
    profileCardCreatedAt: {
      fontSize: 12,
      color: colors.text1Color,
    },
  })
};