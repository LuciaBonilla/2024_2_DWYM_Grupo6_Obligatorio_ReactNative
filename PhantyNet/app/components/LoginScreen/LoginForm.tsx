import { useEffect, useState } from "react";
import { Pressable, View, Text, StyleSheet, Platform } from "react-native";

// ÍCONOS.
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';

// COMPONENTES.
import NormalTextInput from "../shared/inputs/NormalTextInput";

// PROVEEDOR DE CONTEXTO.
import { useAuthContext } from "@/context-providers/AuthContextProvider";

// RUTAS.
import routes from "@/constants/routes";
import { useRouter } from "expo-router";

interface LoginFormProps {
    handleShowUnsuccessfulLoginModal: () => void,
    setUnsuccessfulLoginMessage: (message: string | null | undefined) => void
}

/**
 * Formulario para el inicio de sesión.
 * @param handleShowUnsuccessfulLoginModal
 * @param setUnsuccessfulLoginMessage
 * @estado componente terminado.
 */
export default function LoginForm({ handleShowUnsuccessfulLoginModal, setUnsuccessfulLoginMessage }: LoginFormProps) {
    // Para cambiar de ruta.
    const router = useRouter();

    // Iniciar sesión e indicador de que si el usuario está autorizado.
    const { login, isAuthorizated } = useAuthContext();

    // Valores de los inputs.
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    /**
     * Maneja el inicio de sesión de un usuario.
     * @estado función terminada.
     */
    async function handleLogin() {
        // Resultado del login.
        const result = await login(email, password);

        if (!result.success) {
            // Renderiza el mensaje de inicio de sesión no exitoso.
            setUnsuccessfulLoginMessage(result.message);
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
        <View style={styles.rootView}>
            <NormalTextInput
                viewStyle={styles.inputView}
                inputTitle="EMAIL"
                inputName="login-email"
                inputStyle={styles.textInput}
                setState={setEmail}
                value={email}
                icon={<MaterialIcons name="email" size={24} color="black" style={styles.iconInput} />}
            />
            <NormalTextInput
                viewStyle={styles.inputView}
                inputTitle="CONTRASEÑA"
                inputName="login-password"
                inputStyle={styles.textInput}
                setState={setPassword}
                value={password}
                icon={<Entypo name="lock" size={24} color="black" style={styles.iconInput}/>}
            />
            <Pressable onPress={handleLogin} style={styles.loginButton}>
                <Text>INICIAR SESIÓN</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    rootView: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? 20 : 0
    },
    inputView: {
        position: "relative"
    },
    textInput: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingLeft: 30
    },
    iconInput: {
        position: "absolute",
        top: 25,
        left: 5
    },
    loginButton: {
        backgroundColor: "#f67"
    }
});