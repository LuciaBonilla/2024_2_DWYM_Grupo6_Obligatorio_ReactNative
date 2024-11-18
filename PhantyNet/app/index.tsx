import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context-providers/AuthContextProvider";
import routes from "@/constants/routes";

export default function Home() {
    const router = useRouter();
    const { isAuthorizated } = useAuthContext();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // Marcar el componente como montado
        setIsMounted(true);
    }, []);

    useEffect(() => {
        // Redirigir solo si el componente está montado
        if (isMounted && !isAuthorizated) {
            router.replace(routes.LOGIN_ROUTE);
        }
    }, [isMounted, isAuthorizated]);

    return null;
}