import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Dimensions, ScaledSize } from "react-native";

// Se crea un contexto para almacenar las dimensiones de la ventana actual. 
const WindowDimensionsContext = createContext<ScaledSize | undefined>(undefined);

/**
 * Componente proveedor que envuelve a los componentes hijos y les proporciona
 * acceso al contexto de las dimensiones de la ventana.
 * @param {ReactNode} children - Componentes hijos que tendrán acceso al contexto.
 * @estado TERMINADO.
 */
export function WindowDimensionsProvider({ children }: { children: ReactNode }) {
    const [windowDimensions, setWindowDimensions] = useState(Dimensions.get("window"));

    useEffect(() => {
        const subscription = Dimensions.addEventListener("change", ({ window }) => {
            setWindowDimensions(window);
        });

        return () => subscription?.remove();
    }, []);

    return (
        <WindowDimensionsContext.Provider value={windowDimensions}>
            {children}
        </WindowDimensionsContext.Provider>
    );
};

// Hook personalizado para acceder al contexto de las dimensiones de la ventana.
/**
 * Hook que proporciona las dimensiones actuales de la ventana.
 * 
 * @throws {Error} Si el hook se utiliza fuera de un WindowDimensionsProvider.
 * @returns {ScaledSize} Dimensiones de la ventana.
 */
export const useWindowDimensions = (): ScaledSize => {
    const context = useContext(WindowDimensionsContext);
    if (!context) {
        throw new Error("Ha ocurrido un error al usar el contexto de dimensiones de la window.");
    }
    return context;
};