import { useEffect, useState, useCallback } from "react";
import { Text, StyleSheet, Platform, ScrollView, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { useFocusEffect } from "expo-router";

// ÍCONOS.
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// COLORES.
import colors from "@/constants/colors";

// COMPONENTES.
import NormalTextInput from "@/app/components/shared/inputs/NormalTextInput";

// PROVEEDOR DE CONTEXTO.
import { useWindowDimensions } from "@/context-providers/WindowDimensionsProvider";

// CLASES AUXILIARES.
import BackendCaller from "@/auxiliar-classes/BackendCaller";

/**
 * Formulario para el registro.
 * @estado TERMINADO.
 * @param {*} handleShowUnsuccessfulRegisterModal  Handler para mostrar modal con resultado de operación register 
 * @param {*} setUnsuccessfulRegisterModalMessage callback para definir el mensaje a mostrar en el modal unsuccessful register
 * @param {*} handleShowSuccessfulRegisterModal Segundo handler para mostrar modal con resultado de operación login
 * @param {*} setSuccessfulRegisterModalMessage callback para definir el mensaje a mostrar en el modal successful register
 */
export default function RegisterForm({
    handleShowUnsuccessfulRegisterModal,
    setUnsuccessfulRegisterModalMessage,
    handleShowSuccessfulRegisterModal,
    setSuccessfulRegisterModalMessage
}) {
     // Para estilos dinámicos en base a las dimensiones.
    const { width, height } = useWindowDimensions();
    const [styles, setStyles] = useState(createStyles(width, height));

    useEffect(() => {
        setStyles(createStyles(width, height))
    }, [width, height]);

    // Estado de los inputs.
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    /**
     * Maneja el inicio de sesión de un usuario.
     */
    async function handleRegister() {
        if (username === "" || email === "" || password === "" || repeatPassword === "") { // Campos vacíos.
            // Renderiza el mensaje de registro no exitoso.
            setUnsuccessfulRegisterModalMessage("Hay campos vacíos");
            handleShowUnsuccessfulRegisterModal();
        } else if (password !== repeatPassword) { // Contraseñas no coinciden.
            // Renderiza el mensaje de registro no exitoso.
            setUnsuccessfulRegisterModalMessage("Las contraseñas no coinciden");
            handleShowUnsuccessfulRegisterModal();
        } else if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) { // El email no tiene el formato de correo.
            // Renderiza el mensaje de registro no exitoso.
            setUnsuccessfulRegisterModalMessage("No es un email");
            handleShowUnsuccessfulRegisterModal();
        } else {
            // Resultado del register.
            const result = await BackendCaller.register(username, email, password);

            if (result.statusCode !== 201) { // No Created.
                // Renderiza el mensaje de registro no exitoso.
                setUnsuccessfulRegisterModalMessage(result.data.message);
                handleShowUnsuccessfulRegisterModal();
            } else {
                // Renderiza el mensaje de registro exitoso.
                setSuccessfulRegisterModalMessage(`¡Bienvenido, ${username}!`);
                handleShowSuccessfulRegisterModal();
            }
        }
    }

    // Limpia los inputs.
    useFocusEffect(
        useCallback(() => {
            function clearInputs() {
                setUsername("");
                setEmail("");
                setPassword("");
                setRepeatPassword("");
            }
            clearInputs(); // Llama a la función asincrónica al enfocar la pantalla.
        }, [])) // La dependencia vacía asegura que solo se ejecute al enfocar.

    return (
        // Evita que el teclado tape el input enfocado.
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView style={styles.rootView} contentContainerStyle={styles.rootViewConatinerStyle}>
                {/* Nombre de usuario. */}
                <NormalTextInput
                    viewStyle={styles.inputView}
                    inputTitleStyle={styles.inputTitle}
                    inputTitle="NOMBRE DE USUARIO"
                    inputName="register-username"
                    textInputStyle={styles.textInput}
                    setState={setUsername}
                    value={username}
                    icon={<FontAwesome name="user" size={24} color={colors.text1Color} style={styles.iconInput} />}
                />
                {/* Email. */}
                <NormalTextInput
                    viewStyle={styles.inputView}
                    inputTitleStyle={styles.inputTitle}
                    inputTitle="EMAIL"
                    inputName="register-email"
                    textInputStyle={styles.textInput}
                    setState={setEmail}
                    value={email}
                    icon={<MaterialCommunityIcons name="email" size={24} color={colors.text1Color} style={styles.iconInput} />}
                />
                {/* Contraseña. */}
                <NormalTextInput
                    viewStyle={styles.inputView}
                    inputTitleStyle={styles.inputTitle}
                    inputTitle="CONTRASEÑA"
                    inputName="register-password"
                    textInputStyle={styles.textInput}
                    setState={setPassword}
                    value={password}
                    icon={<FontAwesome name="lock" size={24} color={colors.text1Color} style={styles.iconInput} />}
                    secureTextEntry={true}
                />
                {/* Repetir contraseña. */}
                <NormalTextInput
                    viewStyle={styles.inputView}
                    inputTitleStyle={styles.inputTitle}
                    inputTitle="REPETIR CONTRASEÑA"
                    inputName="register-repeat-password"
                    textInputStyle={styles.textInput}
                    setState={setRepeatPassword}
                    value={repeatPassword}
                    icon={<FontAwesome name="lock" size={24} color={colors.text1Color} style={styles.iconInput} />}
                    secureTextEntry={true}
                />
                {/* Botón. */}
                <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
                    <Text adjustsFontSizeToFit={true} style={styles.registerButtonText}>CREAR CUENTA</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

// ESTILOS.
function createStyles(width, height) {
    return StyleSheet.create({
        rootView: {
            flex: 1,
            padding: 20,
            backgroundColor: colors.background1LighterColor,
            flexDirection: "column",
            borderRadius: 10,
        },
        rootViewConatinerStyle: {
            alignItems: "center",
            justifyContent: "space-between",
            rowGap: 20
        },
        inputView: {
            position: "relative",
            width: width * 0.7,
        },
        inputTitle: {
            fontFamily: "SegoeBold",
            fontSize: 16,
            color: colors.text1Color,
            marginBottom: 3,
        },
        textInput: {
            padding: 10,
            borderWidth: 1,
            borderColor: colors.whiteFriendlyDarkerColor,
            borderRadius: 5,
            paddingLeft: 30,
            fontFamily: "SegoeBold",
            fontWeight: "bold",
            color: colors.text1Color,
            backgroundColor: colors.whiteFriendlyColor
        },
        iconInput: {
            position: "absolute",
            top: 30,
            left: 5,
            zIndex: 10,
        },
        registerButton: {
            backgroundColor: colors.primaryColor,
            width: width * 0.5,
            height: 35,
            borderRadius: 10,
            position: "static",
            justifyContent: "center",
            alignItems: "center",
        },
        registerButtonText: {
            textAlign: "center",
            fontFamily: "SegoeBold",
            fontSize: 16,
            color: colors.text1Color,
        }
    })
};