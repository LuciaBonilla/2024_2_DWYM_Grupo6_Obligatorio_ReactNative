import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

//TIPOS
import { User } from "@/constants/types";

//CONVERTIDOR DE IMAGENES
import Base64Converter from "../../../auxiliar-classes/Base64Converter";

//Tipado de las props recibidas desde OtherUserProfileScreen para poder entenderlas
type ProfileCardProps = {
  user: User;
  postsQuantity: number;
};

/**
 * Card para mostrar la información básica de un Perfil
 */
const ProfileCard: React.FC<ProfileCardProps> = ({ user, postsQuantity }) => {
   
  //Imagen default para perfiles sin foto definida
  const defaultPhoto = require("../../../assets/images/default_profile.png");

  // Convierte la URL base64 de la imagen si es necesario
  const imageSrc = user.profilePicture === "" ? defaultPhoto : Base64Converter.checkBase64Image(user.profilePicture);

    return (
        <View style={styles.profileCard}>
            <View style={styles.profileCardInfo}>
                <Image source={imageSrc} style={styles.profileCardImg} />
                <Text style={styles.profileCardUsername}>{user.username}</Text>
                <Text style={styles.profileCardEmail}>{user.email}</Text>
                <Text style={styles.profileCardPostsQuantity}>{postsQuantity} posts</Text>
                <Text style={styles.profileCardCreatedAt}>
                Miembro desde {new Date(user.createdAt).toLocaleDateString("es-ES", {
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

export default ProfileCard;
