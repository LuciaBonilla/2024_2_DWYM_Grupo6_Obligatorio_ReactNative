import { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from "react-native";

// PROVEEDORES DE CONTEXTO.
import { useAuthContext } from "@/context-providers/AuthContextProvider";
import { useWindowDimensions } from "react-native";

// CLASES AUXILIARES.
import BackendCaller from "@/auxiliar-classes/BackendCaller";
import Base64Converter from "@/auxiliar-classes/Base64Converter";

// COMPONENTES.
import ImageGetter from "@/app/components/shared/others/ImageGetter";

// COLORES.
import colors from "@/constants/colors";

/**
 * Formulario de Editar perfil.
 * @param {*} userData Data de usuario logueado a la aplicación.
 * @param {*} handleHideEditMyProfileForm Handler function para cerrar la ventana emergente de forms.
 * @param {*} attributeToEdit Atributo seleccionado para edición.
 * @param {*} fetchMyUser Método para hacer llamada a backend y obtener info de usuario tras edición.
 */
export default function EditMyProfileForm({
  userData,
  handleHideEditMyProfileForm,
  attributeToEdit,
  fetchMyUser,
}) {
  // Para estilos dinámicos en base a las dimensiones.
  const { width, height } = useWindowDimensions();
  const [styles, setStyles] = useState(createStyles(width, height));

  useEffect(() => {
    setStyles(createStyles(width, height))
  }, [width, height]);

  // Para editar perfil.
  const [username, setUsername] = useState("");
  const [image, setImage] = useState(null);
  const { token } = useAuthContext();

  /**
   * Maneja editar el perfil.
   */
  async function handleEditMyProfile() {
    if (attributeToEdit === "profilePicture" && image) { // Si se quiere cambiar la foto de perfil.
      try {
        const base64Image = await Base64Converter.imageToBase64(image.uri); // Pasar a base64 para envío a backend.

        if (base64Image) {
          const response = await BackendCaller.editProfile(token, userData.username, base64Image);
          if (response.statusCode === 200) { // OK.
            fetchMyUser();
            handleHideEditMyProfileForm();
          } else {
            alert("Error al actualizar el perfil."); // Error.
          }
        } else {
          alert("Error al convertir la imagen."); // Error.
        }
      } catch (error) {
        alert("Error al convertir la imagen."); // Error.
      }
    } else if (attributeToEdit === "username" && username) { // Si se quiere cambiar el nombre de usuario.
      const response = await BackendCaller.editProfile(token, username, userData.profilePicture);
      if (response.statusCode === 200) { // OK.
        fetchMyUser();
        handleHideEditMyProfileForm();
      } else {
        alert("Error al actualizar el perfil."); // Error.
      }
    } else {
      alert("El campo está vacío o no se seleccionó imagen."); // Error.
    }
  };

  return (
    <View style={styles.formContainer}>
      {/* El form se rellena con el container de TextInput en caso de tener que editar username. */}
      <View style={styles.inputContainer}>
        {attributeToEdit === "username" && (
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Nuevo nombre de usuario"
          />
        )}
        {/* El form se rellena con el componente ImageGetter en caso de tener que editar imagen. */}
        {attributeToEdit === "profilePicture" && (
          <View style={styles.imagePickerContainer}>
            <ImageGetter
              setState={setImage}
              imageValue={image}
            />
          </View>
        )}

        {/* Botones. */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleHideEditMyProfileForm}>
            <Text adjustsFontSizeToFit={true} style={styles.buttonText}>CANCELAR</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.acceptButton} onPress={handleEditMyProfile}>
            <Text adjustsFontSizeToFit={true} style={styles.buttonText}>ACEPTAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

function createStyles(width, height) {
  return StyleSheet.create({
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
      width: width * 0.85,
      alignItems: "center",
    },
    input: {
      fontFamily: "SegoeBold",
      fontWeight: "bold",
      height: 40,
      borderColor: colors.whiteFriendlyDarkerColor,
      backgroundColor: colors.whiteFriendlyColor,
      borderWidth: 1,
      borderRadius: 10,
      paddingLeft: 10,
      marginBottom: 15,
      width: "100%",
      color: colors.text1Color,
    },
    imagePickerContainer: {
      marginBottom: 15,
      justifyContent: "center",
      alignItems: "center",
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
      height: 50,
    },
    acceptButton: {
      backgroundColor: colors.primaryDarkerColor,
      paddingVertical: 14,
      paddingHorizontal: 25,
      borderRadius: 35,
      width: "45%",
      position: "static",
      justifyContent: "center",
      alignItems: "center",
      elevation: 5,
      marginTop: 10,
      height: 50,
    },
    buttonText: {
      color: colors.whiteFriendlyColor,
      fontSize: 12,
      textAlign: "center",
      fontWeight: "bold",
    },
  })
};