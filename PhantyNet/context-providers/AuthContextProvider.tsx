import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Text } from "react-native";
import { useRouter } from "expo-router";

// CLASES AUXILIARES.
import BackendCaller from "@/auxiliar-classes/BackendCaller";
import AsyncStorageManager from "@/auxiliar-classes/AsyncStorageManager";

// RUTAS.
import routes from "@/constants/routes";

// ESTILOS COMPARTIDOS.
import createNoContentStyles from "@/app/styles/NoContentStyles";

// Contexto de autenticación, que manejará el estado de autenticación en la aplicación.
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// INTERFACES PARA CONTROL DE TIPOS.
interface AuthContextProviderProps {
    children: ReactNode;
}

interface AuthContextType {
    userID: string | null | undefined;
    token: string | null | undefined;
    isAuthorizated: boolean | null | undefined;
    login: (email: string, password: string) => Promise<{ success: boolean; message?: string | null | undefined }>;
    logout: () => void;
}

/**
 * Proveedor del contexto de autenticación.
 * Este componente gestiona y proporciona el estado de autenticación a los componentes hijos.
 * @param {AuthContextProviderProps} children - Componentes hijos que serán envueltos por el proveedor.
 * @estado TERMINADO.
 */
export function AuthContextProvider({ children }: AuthContextProviderProps) {
    // Para navegar a login.
    const router = useRouter();

    // Estado que almacena la información de autenticación.
    const [userID, setUserID] = useState<string | null | undefined>(null);
    const [token, setToken] = useState<string | null | undefined>(null);
    const [isAuthorizated, setIsAuthorizated] = useState<boolean | null | undefined>(false);

    // Para controlar el estado de carga.
    const [loading, setLoading] = useState(true);

    // Recarga los valores del AsyncStorage cuando el componente se monta.
    useEffect(() => {
        async function loadAuthContextFromStorage() {
            const context = await AsyncStorageManager.loadAuthContextFromStorage();
            setUserID(context.userID);
            setToken(context.token);
            setIsAuthorizated(context.isAuthorizated);

            // Indica que la carga ha terminado.
            setLoading(false);
        }

        loadAuthContextFromStorage();
    }, []);

    // Actualiza el AsyncStorage cada vez que cambien los valores del contexto de autenticación.
    useEffect(() => {
        if (!loading) {
            AsyncStorageManager.saveAuthContextToStorage(userID, token, isAuthorizated);
        }
    }, [userID, token, isAuthorizated]);

    // Redirige al usuario a la pantalla de inicio de sesión si no está autenticado.
    useEffect(() => {
        if (!loading && isAuthorizated === false) {
            router.replace(routes.LOGIN_ROUTE as any); // No permite ir hacia atrás o hacia adelante.
        }
    }, [isAuthorizated]);

    /**
     * Método para iniciar sesión del usuario.
     * @param {string} email - Correo electrónico del usuario.
     * @param {string} password - Contraseña del usuario.
     * @estado TERMINADO.
     */
    async function login(email: string, password: string) {
        // Intenta iniciar sesión por backend.
        const response = await BackendCaller.login(email, password);

        let result = { success: false, message: "No se ha podido iniciar sesión" };
        if (response) {
            switch (response.statusCode) {
                case 200: // OK.
                    setUserID(response.data._id);
                    setToken(response.data.token);
                    setIsAuthorizated(true);
                    result = { success: true, message: "Se ha podido iniciar sesión" };
                    break
                case 401: // Unauthorizated.
                case 500: // Internal Server Error.
                    setUserID(null);
                    setToken(null);
                    setIsAuthorizated(false);
                    result = { success: false, message: response.data.message };
                    break;
                default: // Error inesperado.
                    result = { success: false, message: "Ha ocurrido un error imprevisto." };
            }
        }
        return result;
    }

    /**
     * Método para cerrar sesión del usuario.
     * Limpia la información de autenticación en el contexto.
     * @estado TERMINADO.
     */
    async function logout() {
        setUserID(null);
        setToken(null);
        setIsAuthorizated(false);
    }

    return (
        loading ? (
            // Mientras se cargan los datos del AsyncStorage, evita renderizar los hijos y muestra un mensaje de carga.
            <Text adjustsFontSizeToFit={true} style={createNoContentStyles().loadingMessage}>Cargando...</Text>
        ) : (
            // Proporciona el contexto a los componentes hijos.
            <AuthContext.Provider value={{ userID, token, isAuthorizated, login, logout }}>
                {children}
            </AuthContext.Provider>
        )
    );
}

/**
 * Hook personalizado para acceder al contexto de autenticación.
 * @throws {Error} Si se utiliza fuera del AuthContextProvider.
 * @returns {AuthContextType} Valores del contexto de autenticación.
 */
export function useAuthContext(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("Ha ocurrido un error al usar el contexto de autenticación.");
    }
    return context;
}