import { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";

// PROVEEDORES DE CONTEXTO.
import { useAuthContext } from "@/context-providers/AuthContextProvider";

// CLASES AUXILIARES.
import BackendCaller from "@/auxiliar-classes/BackendCaller";
import Base64Converter from "@/auxiliar-classes/Base64Converter";

// COMPONENTES.
import ImageGetter from "../shared/others/ImageGetter";

/**
 * Formulario de Editar perfil.
 * @estado TERMINADO.
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
          alert("Error al convertir la imagen a base64.");
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
      <View style={styles.inputContainer}>
        {attributeToEdit === "username" && (
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Nuevo nombre de usuario"
          />
        )}

        {attributeToEdit === "profilePicture" && (
          <View style={styles.imagePickerContainer}>
            <ImageGetter 
              setState={setImage} 
              imageValue={image} 
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