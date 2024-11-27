import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Image, Text } from "react-native";
import { useAuthContext } from "@/context-providers/AuthContextProvider";
import BackendCaller from "@/auxiliar-classes/BackendCaller";
import Base64Converter from "@/auxiliar-classes/Base64Converter";
import { User } from "@/constants/types";
import * as ImagePicker from 'expo-image-picker';

const EditMyProfileForm = ({
  userData,
  handleHideEditMyProfileForm,
  attributeToEdit,
  fetchMyUser,
}) => {
  const [inputContent, setInputContent] = useState(""); 
  const [imageUri, setImageUri] = useState(null);
  const { token } = useAuthContext();

  const requestGalleryPermission = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Se necesitan permisos para acceder a la galería.");
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestGalleryPermission();
    if (hasPermission) {
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!pickerResult.canceled && pickerResult.assets && pickerResult.assets[0]) {
        const uri = pickerResult.assets[0].uri;
        console.log("Imagen seleccionada con URI:", uri);
        setImageUri(uri);
      }
    }
  };

  const handleEditMyProfile = async () => {
    console.log("handleEditMyProfile llamado");

    if (attributeToEdit === "profilePicture" && imageUri) {
      console.log("Actualizando foto de perfil:", imageUri);
      
      try {
        const base64Image = await Base64Converter.imageToBase64(imageUri);
        console.log("Imagen convertida a base64:", base64Image);

        if (base64Image) {
          const response = await BackendCaller.editProfile(token, userData?.username, base64Image);
          if (response?.statusCode === 200) {
            console.log("Perfil actualizado exitosamente.");
            fetchMyUser(); 
            handleHideEditMyProfileForm();
          } else {
            alert("Error al actualizar el perfil.");
          }
        } else {
          alert("Error al convertir la imagen a base64.");
        }
      } catch (error) {
        console.error("Error al convertir la imagen:", error);
        alert("Error al convertir la imagen.");
      }
    } else if (attributeToEdit === "username" && inputContent) {
      const response = await BackendCaller.editProfile(token, inputContent, userData?.profilePicture);
      if (response?.statusCode === 200) {
        fetchMyUser();
        handleHideEditMyProfileForm();
      } else {
        alert("Error al actualizar el perfil.");
      }
    } else {
      alert("El campo está vacío o no se seleccionó imagen.");
    }
  };

  return (
    <View style={styles.formContainer}>
      <View style={styles.inputContainer}>
        {attributeToEdit === "username" && (
          <TextInput
            style={styles.input}
            value={inputContent}
            onChangeText={setInputContent}
            placeholder="Nuevo Nombre de Usuario"
          />
        )}

        {attributeToEdit === "profilePicture" && (
          <View style={styles.imagePickerContainer}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.imagePreview} />
            ) : (
              <Text style={styles.imagePlaceholder}>Selecciona una imagen</Text>
            )}
            <Button title="Elegir Imagen" onPress={pickImage} />
          </View>
        )}

        <View style={styles.buttonsContainer}>
          <Button title="Cancelar" onPress={handleHideEditMyProfileForm} />
          <Button title="Aceptar" onPress={handleEditMyProfile} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  inputContainer: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: "80%",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 15,
  },
  imagePickerContainer: {
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginBottom: 10,
  },
  imagePlaceholder: {
    color: '#888',
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default EditMyProfileForm;
