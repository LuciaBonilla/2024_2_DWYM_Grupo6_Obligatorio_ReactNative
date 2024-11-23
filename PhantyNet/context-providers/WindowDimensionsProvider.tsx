import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Dimensions, ScaledSize } from "react-native";

const WindowDimensionsContext = createContext<ScaledSize | undefined>(undefined);

/**
 * Provee del contexto de dimensiones de la window.
 * @param {*} children
 * @returns 
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

// Hook para consumir las dimensiones.
export const useWindowDimensions = () => {
    const context = useContext(WindowDimensionsContext);
    if (!context) {
        throw new Error("Ha ocurrido un error al usar el contexto de dimensiones de la window.");
    }
    return context;
};