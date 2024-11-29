import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Permite guardar y cargar el contexto de autenticación en AsyncStorage.
 * @estado TERMINADO.
 */
export default class AsyncStorageManager {
    /**
     * Guarda el contexto de autenticación en AsyncStorage.
     * @param {*} userID 
     * @param {*} token 
     * @param {*} isAuthorizated
     * @estado TERMINADO.
     */
    static async saveAuthContextToStorage(userID, token, isAuthorizated) {
        try {
            if (userID && token) {
                await AsyncStorage.setItem("userID", userID);
                await AsyncStorage.setItem("token", token);
            } else {
                await AsyncStorage.removeItem("userID");
                await AsyncStorage.removeItem("token");
            }
            await AsyncStorage.setItem("isAuthorizated", isAuthorizated ? "true" : "false");
        } catch (error) {
            console.error("Error al guardar en el almacenamiento local:", error);
        }
    }

    /**
     * Recarga el contexto de autenticación desde AsyncStorage a un objeto plano.
     * @returns Objeto plano con todo el contexto de autenticación.
     * @estado TERMINADO.
     */
    static async loadAuthContextFromStorage() {
        try {
            const userID = await AsyncStorage.getItem("userID");
            const token = await AsyncStorage.getItem("token");
            const isAuthorizated = (await AsyncStorage.getItem("isAuthorizated")) === "true";

            return {
                userID,
                token,
                isAuthorizated
            };
        } catch (error) {
            console.error("Error al cargar desde el almacenamiento local:", error);
            return {};
        }
    }
}