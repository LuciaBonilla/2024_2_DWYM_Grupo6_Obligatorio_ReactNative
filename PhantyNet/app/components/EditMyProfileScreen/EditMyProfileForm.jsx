import { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from "react-native";

// PROVEEDORES DE CONTEXTO.
import { useAuthContext } from "@/context-providers/AuthContextProvider";

// CLASES AUXILIARES.
import BackendCaller from "@/auxiliar-classes/BackendCaller";
import Base64Converter from "@/auxiliar-classes/Base64Converter";

// COMPONENTES.
import ImageGetter from "../shared/others/ImageGetter";

import {colors} from "@/constants/colors";

/**
 * Formulario de Editar perfil.
 * @param {*} userData data de usuario logueado a la aplicación
 * @param {*} handleHideEditMyProfileForm handler function para cerrar la ventana emergente de forms
 * @param {*} attributeToEdit atributo seleccionado para edición
 * @param {*} fetchMyUser método para hacer llamada a backend y obtener info de usuario tras edición
 */
export default function EditMyProfileForm({
  userData,
  handleHideEditMyProfileForm,
  attributeToEdit,
  fetchMyUser,
}) {

  // Para editar perfil.
  const [username, setUsername] = useState(""); 
  const [image, setImage] = useState(null); 
  const { token } = useAuthContext();

  /**
   * Edita el perfil.
   */
  async function handleEditMyProfile() {
    if (attributeToEdit === "profilePicture" && image) {
      try {
        const base64Image = await Base64Converter.imageToBase64(image.uri);

        if (base64Image) {
          const response = await BackendCaller.editProfile(token, userData.username, base64Image);
          if (response.statusCode === 200) {
            fetchMyUser(); 
            handleHideEditMyProfileForm();
          } else {
            alert("Error al actualizar el perfil.");
          }
        } else {
          alert("Error al convertir la imagen.");
        }
      } catch (error) {
        alert("Error al convertir la imagen.");
      }
    } else if (attributeToEdit === "username" && username) {
      const response = await BackendCaller.editProfile(token, username, userData.profilePicture);
      if (response.statusCode === 200) {
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
      {/* el form se rellena con el container de inputtext en caso de tener que editar username */}
      <View style={styles.inputContainer}>
        {attributeToEdit === "username" && (
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Nuevo nombre de usuario"
          />
        )}
        {/* el form se rellena con el componente ImageGetter en caso de tener que editar imagen */}
        {attributeToEdit === "profilePicture" && (
          <View style={styles.imagePickerContainer}>
            <ImageGetter 
              setState={setImage} 
              imageValue={image} 
            />
          </View>
        )}

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleHideEditMyProfileForm}>
            <Text style={styles.buttonText}>CANCELAR</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.acceptButton} onPress={handleEditMyProfile}>
            <Text style={styles.buttonText}>ACEPTAR</Text>
          </TouchableOpacity>
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
    backgroundColor: colors.background2Color,
    padding: 20,
    borderRadius: 15,
    width: "80%",
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 15,
    width: "100%",
    color: "#fff",
  },
  imagePickerContainer: {
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelButton: {
    backgroundColor: colors.secondaryColor,
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 35,
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    marginTop: 10,
  },
  acceptButton: {
    backgroundColor: colors.primaryDarkerColor,
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 35,
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
});