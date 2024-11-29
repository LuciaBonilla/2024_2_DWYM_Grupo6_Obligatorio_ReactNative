import * as ImageManipulator from "expo-image-manipulator";

export default class Base64Converter {
  // Método encargado de convertir imágenes a Base64.
  // Debemos bajar la calidad, ya que las HTTP request no aceptan datos muy grandes.
  static async imageToBase64(uri, maxWidth = 800, maxHeight = 800, initialQuality = 0.7) {

    if (!uri) {
      throw new Error("No se ha proporcionado una URI válida para la imagen.");
    }

    try {
      // Redimensionar la imagen.
      const resizedImage = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: maxWidth, height: maxHeight } }],
        { compress: initialQuality, format: ImageManipulator.SaveFormat.JPEG }
      );

      // Convertir la imagen base64.
      const response = await fetch(resizedImage.uri);
      const blob = await response.blob();
      const reader = new FileReader();

      // Promesa que resuelve con la cadena base64 o error.
      return new Promise((resolve, reject) => {
        reader.onloadend = () => {
          const base64String = reader.result;
          resolve(base64String);
        };
        reader.onerror = (error) => reject("Error al leer la imagen: " + error);
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Error al redimensionar la imagen:", error);
      throw new Error("Error al redimensionar la imagen: " + error);
    }
  }

  // Método para verificar si una cadena es una imagen en base64 basado en expresiones regulares.
  static checkBase64Image(base64String) {
    const regex = /^data:image\/([a-zA-Z]*);base64,([^\"]*)$/;
    return regex.test(base64String);
  }
}