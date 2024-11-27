import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";

//PROVEEDORES DE CONTEXTO
import { useAuthContext } from "@/context-providers/AuthContextProvider";

//AUXILIARES
import BackendCaller from "@/auxiliar-classes/BackendCaller";
import Base64Converter from "@/auxiliar-classes/Base64Converter";

//COMPONENTES
import ImageGetter from "../shared/others/ImageGetter"; 

//COLORES
import { colors } from "@/constants/colors";


/**
 * Form para manejar el editado de información de perfil del usuario logueado
 * @estado TERMINADO.
 */
const EditMyProfileForm = ({
  userData,
  handleHideEditMyProfileForm,
  attributeToEdit,
  fetchMyUser,
}) => {
  //estados necesarios para guardar la info con que editar el usuario
  const [inputContent, setInputContent] = useState(""); 
  const [imageUri, setImageUri] = useState(null); 
  //token de auth para hacer llamados a backend
  const { token } = useAuthContext();

  //Handler con lógica para encausar el llamado que edita profile en backend
  const handleEditMyProfile = async () => {
    //Si se debe editar la imagen de perfil
    if (attributeToEdit === "profilePicture" && imageUri) {      
      try {
        //conversión a base64 de la imagen, requerido por backend
        const base64Image = await Base64Converter.imageToBase64(imageUri);
        if (base64Image) {
          //si la conversión funciona, llama al editProfile con username preexistente y nueva imagen
          const response = await BackendCaller.editProfile(token, userData?.username, base64Image);
          if (response?.statusCode === 200) {
            //refresco info de perfil de usuario con los cambios guardados y cierro la ventana de forms
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
    } //Si se debe editar username
    else if (attributeToEdit === "username" && inputContent) {
      // Llama al editProfile con el nuevo username del textinput y con la profile picutre preexistente
      const response = await BackendCaller.editProfile(token, inputContent, userData?.profilePicture);
      if (response?.statusCode === 200) {
        //refresco info de perfil de usuario con los cambios guardados y cierro la ventana de forms
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
            value={inputContent}
            onChangeText={setInputContent}
            placeholder="Nuevo Nombre de Usuario"
            placeholderTextColor="#fff"
          />
        )}
        {/* el form se rellena con el componente ImageGetter en caso de tener que editar imagen */}
        {attributeToEdit === "profilePicture" && (
          <View style={styles.imagePickerContainer}>
            <ImageGetter 
              setState={setImageUri} 
              imageValue={imageUri} 
            />
          </View>
        )}

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleHideEditMyProfileForm}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.acceptButton} onPress={handleEditMyProfile}>
            <Text style={styles.buttonText}>Aceptar</Text>
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

export default EditMyProfileForm;
