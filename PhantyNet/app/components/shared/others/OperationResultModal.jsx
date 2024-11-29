import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";

/**
 * Modal de resultado de operación empleado para resultados.
 * @param {*} visible Indica si el modal debe estar visible o no.
 * @param {*} message Mensaje que se mostrará en el modal.
 * @param {*} modalStyle Estilo personalizado para el contenedor del modal.
 * @param {*} textStyle Estilo personalizado para el texto del mensaje.
 * @param {*} icon Icono opcional que se mostrará en el modal.
 * @param {*} buttonStyle Estilo personalizado para el botón del modal.
 * @param {*} buttonTextStyle Estilo personalizado para el texto del botón.
 * @param {*} buttonText Texto que se mostrará en el botón.
 * @param {*} handleHideOperationResultModal Función que se ejecutará al cerrar el modal.
 * @estado TERMINADO.
 */
export default function OperationResultModal({
    visible,
    message,
    modalStyle,
    textStyle,
    icon,
    buttonStyle,
    buttonTextStyle,
    buttonText,
    handleHideOperationResultModal
}) {
    return (
        <Modal transparent={true} visible={visible} animationType="fade">
            <View style={styles.overlay}>
                <View style={modalStyle}>
                    <Text adjustsFontSizeToFit={true} style={textStyle}>{message}</Text>
                    {icon}
                    <TouchableOpacity style={buttonStyle} onPress={handleHideOperationResultModal}>
                        <Text adjustsFontSizeToFit={true} style={buttonTextStyle}>{buttonText}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

// ESTILOS.
const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    }, // Parece que se muestre la opacidad.
});