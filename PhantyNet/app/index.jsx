import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context-providers/AuthContextProvider";
import * as SplashScreen from "expo-splash-screen";

// RUTAS.
import routes from "@/constants/routes";

// Evita que la pantalla de splash se oculte automáticamente antes de cargar los recursos.
SplashScreen.preventAutoHideAsync();

/**
 * Redirige a la screen que corresponda si el usuario está autenticado.
 * @estado TERMINADO.
 */
export default function Home() {
    // Para navegación.
    const router = useRouter();

    const { isAuthorizated } = useAuthContext();
    const [isMounted, setIsMounted] = useState(false);

    // Esto genera un delay para que las demás screen puedan cargarse.
    useEffect(() => {
        // Marcar el componente como montado
        setIsMounted(true);
    }, []);

    useEffect(() => {
        // Redirigir solo si el componente está montado.
        if (isMounted && !isAuthorizated) {
            SplashScreen.hideAsync();
            router.replace(routes.LOGIN_ROUTE);
        } else {
            if (isMounted && isAuthorizated) {
                SplashScreen.hideAsync();
                router.replace(routes.MY_FEED_ROUTE);
            }
        }
    }, [isMounted, isAuthorizated]);

    return null;
}