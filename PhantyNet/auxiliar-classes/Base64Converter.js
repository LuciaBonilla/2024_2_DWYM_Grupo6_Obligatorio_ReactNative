import defaultPhoto from "../assets/images/default_profile.png";

/**
 * Retorna imágenes en base64 y checkea si un string es una imagen en base64.
 * @estado TERMINADO.
 */
export class Base64Converter {
    /**
     * Verifica que la imagen en base 64 es correcta y la retorna.
     * Ej. imagen de punto rojo en base64: "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
     * @param {*} base64String 
     * @returns la imagen en base 64 si está bien, en caso contrario, retorna la foto por defecto.
     * @estado TERMINADO.
     */
    static checkBase64Image(base64String) {
        // Verifica si la cadena es vacía o indefinida.
        if (!base64String) {
            return defaultPhoto;
        }

        // Verifica si la cadena tiene el prefijo 'data:image/' y contiene ';base64,'.
        const base64Pattern = /^data:image\/(png|jpeg|jpg);base64,/;

        // Si el string no coincide con el patrón esperado, devuelve la imagen por defecto.
        if (!base64Pattern.test(base64String)) {
            return defaultPhoto;
        }

        // Si pasa todas las validaciones, retorna la cadena en base64 original.
        return base64String;
    }

    /**
     * Convierte una imagen a base 64.
     * Se asegura que no supere los 95kB.
     * @param {*} file 
     * @param {*} maxWidth 
     * @param {*} maxHeight 
     * @param {*} initialQuality 
     * @param {*} targetBase64SizeKB 
     * @estado TERMINADO.
     */
    static async imageToBase64(file, maxWidth = 800, maxHeight = 800, initialQuality = 0.7, targetBase64SizeKB = 95) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            // Detectamos el formato a partir del tipo MIME del archivo (JPEG o PNG)
            const fileType = file.type;  // "image/jpeg" o "image/png"

            reader.onload = () => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;
                    let quality = initialQuality;
                    const targetFileSizeKB = targetBase64SizeKB * 0.75;  // Aproximadamente 71 KB para compensar el aumento de tamaño en base64

                    // Ajuste inicial de dimensiones de imagen
                    if (width > maxWidth || height > maxHeight) {
                        const aspectRatio = width / height;
                        if (width > height) {
                            width = maxWidth;
                            height = maxWidth / aspectRatio;
                        } else {
                            height = maxHeight;
                            width = maxHeight * aspectRatio;
                        }
                    }

                    const resizeAndCompress = () => {
                        canvas.width = width;
                        canvas.height = height;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0, width, height);

                        // Convertimos a dataURL usando el tipo MIME detectado (JPEG o PNG)
                        let dataUrl = canvas.toDataURL(fileType, quality);
                        let fileSizeKB = Math.ceil((dataUrl.length * 3) / 4 / 1024);  // Tamaño en KB del base64

                        // Ajuste de calidad y tamaño de imagen para alcanzar el límite de tamaño
                        while (fileSizeKB > targetFileSizeKB && quality > 0.1) {
                            quality -= 0.05;
                            dataUrl = canvas.toDataURL(fileType, quality);
                            fileSizeKB = Math.ceil((dataUrl.length * 3) / 4 / 1024);
                        }

                        // Ajuste de tamaño si la calidad no es suficiente
                        while (fileSizeKB > targetFileSizeKB && (width > 100 || height > 100)) {
                            width *= 0.9;
                            height *= 0.9;
                            canvas.width = width;
                            canvas.height = height;
                            ctx.drawImage(img, 0, 0, width, height);
                            dataUrl = canvas.toDataURL(fileType, quality);
                            fileSizeKB = Math.ceil((dataUrl.length * 3) / 4 / 1024);
                        }

                        resolve(dataUrl);  // Retorna el base64 final con el prefijo adecuado
                    };

                    resizeAndCompress();
                };

                img.onerror = (error) => reject("Error al procesar la imagen: " + error);
                img.src = reader.result;
            };

            reader.onerror = (error) => reject("Error al leer el archivo: " + error);
            reader.readAsDataURL(file);
        });
    }
}

export default Base64Converter;