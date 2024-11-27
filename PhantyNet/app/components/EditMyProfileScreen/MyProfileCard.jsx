import { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

// PROVEEDORES DE CONTEXTO.
import { useWindowDimensions } from "react-native";

/**
 * Tarjeta propia de usuario (sale al editar perfil).
 * @estado TERMINADO.
 */
export default function MyProfileCard({ userData }) {
  // Para estilos.
  const { width, height } = useWindowDimensions();
  const [styles, setStyles] = useState(createStyles(width, height));

  useEffect(() => {
    setStyles(createStyles(width, height))
  }, [width, height]);
  const defaultPhoto = require("../../../assets/images/default_profile.png");

  //Se setea imageUri de la immagen de perfil custom del usuario o se usa la imagen default si no está seteada
  const imageUri = userData.profilePicture
    ? { uri: userData.profilePicture }
    : defaultPhoto;

  return (
    <View style={styles.profileCard}>
      <View style={styles.profileCardInfo}>
        <View style={styles.profileCardHeader}>
          <Image source={imageUri} style={styles.profileCardImg} />
          <View style={styles.profileCardTextContainer}>
            <Text style={styles.profileCardUsername}>{userData.username}</Text>
          </View>
        </View>
        <Text style={styles.profileCardEmail}>{userData.email}</Text>
        <Text style={styles.profileCardCreatedAt}>
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

function createStyles(width, height) {
  return StyleSheet.create({
    profileCard: {
      backgroundColor: "#fff",
      borderRadius: 10,
      margin: 10,
      padding: 15,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      flexDirection: "column",
    },
    profileCardInfo: {
      alignItems: "center",
    },
    profileCardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    profileCardImg: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 10,
      marginRight: 10,
    },
    profileCardTextContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    profileCardUsername: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 5,
    },
    profileCardEmail: {
      fontSize: 16,
      color: "#555",
      marginBottom: 5,
    },
    profileCardCreatedAt: {
      fontSize: 12,
      color: "#888",
    },
  })
};