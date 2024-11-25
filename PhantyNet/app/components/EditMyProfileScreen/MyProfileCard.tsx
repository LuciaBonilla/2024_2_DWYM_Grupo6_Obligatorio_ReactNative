//CONVERTIDOR DE IMAGENES
import Base64Converter from "../../../auxiliar-classes/Base64Converter";

// IMPORTS DE REACT NATIVE
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

//TIPOS
import { User } from "@/constants/types";

// Tipos para las props del componente.
interface MyProfileCardProps {
  username: string;
  profilePicture: string; // Puede ser una URL o una cadena base64
}

const MyProfileCard: React.FC<MyProfileCardProps> = ({ username, profilePicture }) => {

  const defaultPhoto = require("../../../assets/images/default_profile.png");
  // Verifica si la imagen es una cadena base64 o una URL válida.
  const imageUri = profilePicture === "" ? defaultPhoto : Base64Converter.checkBase64Image(profilePicture);

  return (
    <View style={styles.card}>
      <Image source={typeof imageUri === 'string' ? { uri: imageUri } : imageUri} style={styles.profilePicture} />
      <Text style={styles.username}>{username}</Text>
    </View>
  );
};

export default MyProfileCard;

// Estilos para el componente
const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, // Para darle sombra en Android
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
 
