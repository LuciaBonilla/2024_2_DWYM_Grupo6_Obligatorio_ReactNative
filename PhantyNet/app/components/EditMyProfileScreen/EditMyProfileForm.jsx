import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { useAuthContext } from "@/context-providers/AuthContextProvider";
import BackendCaller from "@/auxiliar-classes/BackendCaller";
import Base64Converter from "@/auxiliar-classes/Base64Converter";
import ImageGetter from "../shared/others/ImageGetter"; // Importamos ImageGetter

const EditMyProfileForm = ({
  userData,
  handleHideEditMyProfileForm,
  attributeToEdit,
  fetchMyUser,
}) => {
  const [inputContent, setInputContent] = useState(""); 
  const [imageUri, setImageUri] = useState(null); 
  const { token } = useAuthContext();

  const handleEditMyProfile = async () => {
    console.log("handleEditMyProfile llamado");

    if (attributeToEdit === "profilePicture" && imageUri) {
      console.log("Actualizando foto de perfil:", imageUri);
      
      try {
        if (typeof imageUri !== 'string' || imageUri.trim() === '') {
          throw new Error("La URI de la imagen no es válida.");
        }

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
            <ImageGetter 
              setState={setImageUri} 
              imageValue={imageUri} 
            />
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
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default EditMyProfileForm;
