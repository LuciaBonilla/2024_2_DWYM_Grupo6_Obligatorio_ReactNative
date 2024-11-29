import { useEffect, useState } from "react";
import { Text, StyleSheet, Platform, ScrollView, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

// ÍCONOS.
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';

// COLORES.
import colors from "@/constants/colors";

// COMPONENTES.
import NormalTextInput from "@/app/components/shared/inputs/NormalTextInput";

// PROVEEDOR DE CONTEXTO.
import { useAuthContext } from "@/context-providers/AuthContextProvider";
import { useWindowDimensions } from "@/context-providers/WindowDimensionsProvider";

// RUTAS.
import routes from "@/constants/routes";

/**
 * Formulario para el inicio de sesión.
 * @estado TERMINADO.
 * @param {*} handleShowUnsuccessfulLoginModal Handler para mostrar modal con resultado de operación login.
 * @param {*} setUnsuccessfulLoginMessage Callback para definir el mensaje del modal de resultado.
 */
export default function LoginForm({
    handleShowUnsuccessfulLoginModal,
    setUnsuccessfulLoginMessage
}) {
    // Para estilos dinámicos en base a las dimensiones.
    const { width, height } = useWindowDimensions();
    const [styles, setStyles] = useState(createStyles(width, height));

    useEffect(() => {
        setStyles(createStyles(width, height))
    }, [width, height]);

    // Para cambiar de ruta.
    const router = useRouter();

    // Iniciar sesión e indicador de que si el usuario está autorizado.
    const { login, isAuthorizated } = useAuthContext();

    // Estado de los inputs.
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    /**
     * Maneja el inicio de sesión de un usuario.
     */
    async function handleLogin() {
        // Resultado del login.
        const result = await login(email, password);

        if (!result.success) {
            if (result.message) {
                // Renderiza el mensaje de inicio de sesión no exitoso.
                setUnsuccessfulLoginMessage(result.message);
            } else {
                setUnsuccessfulLoginMessage("Ha ocurrido un error");
            }
            handleShowUnsuccessfulLoginModal();
        }
    }

    useEffect(() => {
        // Va a "MY_FEED_ROUTE" si está autorizado.
        if (isAuthorizated === true) {
            router.replace(routes.MY_FEED_ROUTE);
        }
    }, [isAuthorizated])

    return (
        // Evita que el teclado tape el input enfocado.
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView style={styles.rootView} contentContainerStyle={styles.rootViewConatinerStyle}>
                {/* Email. */}
                <NormalTextInput
                    viewStyle={styles.inputView}
                    inputTitleStyle={styles.inputTitle}
                    inputTitle="EMAIL"
                    inputName="login-email"
                    textInputStyle={styles.textInput}
                    setState={setEmail}
                    value={email}
                    icon={<MaterialIcons name="email" size={24} color={colors.text1Color} style={styles.iconInput} />}
                />
                {/* Contraseña. */}
                <NormalTextInput
                    viewStyle={styles.inputView}
                    inputTitleStyle={styles.inputTitle}
                    inputTitle="CONTRASEÑA"
                    inputName="login-password"
                    textInputStyle={styles.textInput}
                    setState={setPassword}
                    value={password}
                    icon={<Entypo name="lock" size={24} color={colors.text1Color} style={styles.iconInput} />}
                    secureTextEntry={true}
                />
                {/* Botón. */}
                <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
                    <Text adjustsFontSizeToFit={true} style={styles.loginButtonText}>INICIAR SESIÓN</Text>
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
            marginBottom: 10,
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
            color: colors.text1Color,
            backgroundColor: colors.whiteFriendlyColor
        },
        iconInput: {
            position: "absolute",
            top: 30,
            left: 5,
            zIndex: 10,
        },
        loginButton: {
            backgroundColor: colors.primaryColor,
            width: width * 0.5,
            height: 35,
            borderRadius: 10,
            position: "static",
            justifyContent: "center",
            alignItems: "center",
        },
        loginButtonText: {
            textAlign: "center",
            fontFamily: "SegoeBold",
            fontSize: 16,
            color: colors.text1Color,
        }
    })
};