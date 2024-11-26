//CONVERTIDOR DE IMAGENES
import Base64Converter from "../../../auxiliar-classes/Base64Converter";

// IMPORTS DE REACT NATIVE
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

//TIPOS
import { User } from "@/constants/types";

// Tipos para las props del componente.
interface MyProfileCardProps {
  userData: User;
}

const MyProfileCard: React.FC<MyProfileCardProps> = ({ userData }) => {

  const defaultPhoto = require("../../../assets/images/default_profile.png");
  // Verifica si la imagen es una cadena base64 o una URL válida.
  const imageUri = userData.profilePicture === "" ? defaultPhoto : Base64Converter.checkBase64Image(userData.profilePicture);

  return (
      <View style={styles.profileCard}>
            <View style={styles.profileCardInfo}>
                <Image source={typeof imageUri === 'string' ? { uri: imageUri } : imageUri} style={styles.profileCardImg} />
                <Text style={styles.profileCardUsername}>{userData.username}</Text>
                <Text style={styles.profileCardEmail}>{userData.email}</Text>
                {/* <Text style={styles.profileCardPostsQuantity}>{postsQuantity} posts</Text> */}
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

export default MyProfileCard;

// Estilos para el componente
const styles = StyleSheet.create({
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  profileCardInfo: {
    alignItems: "center",
  },
  profileCardImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
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
  profileCardPostsQuantity: {
    fontSize: 14,
    marginBottom: 5,
  },
  profileCardCreatedAt: {
    fontSize: 12,
    color: "#888",
  },
});
 
