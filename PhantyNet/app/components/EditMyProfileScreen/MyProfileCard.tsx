import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

// IMPORTS DE REACT NATIVE
import { User } from "@/constants/types";
import Base64Converter from "../../../auxiliar-classes/Base64Converter";

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
        <View style={styles.profileCardHeader}>
          <Image source={typeof imageUri === 'string' ? { uri: imageUri } : imageUri} style={styles.profileCardImg} />
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

export default MyProfileCard;

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
  editButton: {
    marginLeft: 10,
  },
});
