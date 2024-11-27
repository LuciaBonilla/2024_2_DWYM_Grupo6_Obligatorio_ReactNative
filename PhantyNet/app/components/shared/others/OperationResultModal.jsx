import React from "react";
import { View, Text, Modal, StyleSheet, Pressable } from "react-native";

/**
 * Modal de resultado de operación.
 * @estado TERMINADO.
 */
export default function OperationResultModal({ visible, message, modalStyle, textStyle, icon, buttonStyle, buttonTextStyle, buttonText, handleHideOperationResultModal }) {
    return (
        <Modal transparent={true} visible={visible} animationType="fade">
            <View style={styles.overlay}>
                <View style={modalStyle}>
                    <Text style={textStyle}>{message}</Text>
                    {icon}
                    <Pressable style={buttonStyle} onPress={handleHideOperationResultModal}>
                        <Text style={buttonTextStyle}>{buttonText}</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
});