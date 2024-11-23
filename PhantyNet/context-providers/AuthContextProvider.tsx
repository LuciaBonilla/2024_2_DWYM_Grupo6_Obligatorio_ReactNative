import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Text } from "react-native";

// CLASES AUXILIARES.
import BackendCaller from "../auxiliar-classes/BackendCaller";
import AsyncStorageManager from "../auxiliar-classes/AsyncStorageManager";

// Contexto de autenticación.
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
 * Provee del contexto de autenticación.
 * @param {*} children
 * @estado TERMINADO.
 */
export function AuthContextProvider({ children }: AuthContextProviderProps) {
    // Atributos del contexto de autenticación.
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

    /**
     * Inicia sesión.
     * @param {*} email 
     * @param {*} password 
     * @returns Resultado de la operación.
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
                case 401: // Unauthorizated
                case 500: // Internal Server Error.
                    setUserID(null);
                    setToken(null);
                    setIsAuthorizated(false);
                    result = { success: false, message: response.data.message };
                    break;
                default:
                    result = { success: false, message: "Ha ocurrido un error imprevisto." };
            }
        }
        return result;
    }

    /**
     * Cierra sesión.
     * @estado TERMINADO.
     */
    async function logout() {
        setUserID(null);
        setToken(null);
        setIsAuthorizated(false);
    }

    return (
        loading ? (
            // Mientras se cargan los datos del AsyncStorage, evita renderizar los hijos.
            <Text>Cargando...</Text>
        ) : (
            <AuthContext.Provider value={{ userID, token, isAuthorizated, login, logout }}>
                {children}
            </AuthContext.Provider>
        )
    );
}

export function useAuthContext(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("Ha ocurrido un error al usar el contexto de autenticación.");
    }
    return context;
}