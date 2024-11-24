import { useLocalSearchParams } from "expo-router";
import { Text, View, StyleSheet, Platform } from "react-native";
import { useEffect, useState } from "react";
import { UserInfo, Post, User } from "@/constants/types";


// PROVEEDOR DE CONTEXTO.
import { useAuthContext } from "@/context-providers/AuthContextProvider";
import { useWindowDimensions } from "@/context-providers/WindowDimensionsProvider";

// RUTAS.
import routes from "@/constants/routes";

// COLORES.
import { colors } from "@/constants/colors";

// ÍCONOS.
import FontAwesome from "@expo/vector-icons/FontAwesome";

import BackendCaller from "@/auxiliar-classes/BackendCaller";
import ProfileCard from "@/app/components/OtherUserProfileScreen/ProfileCard";
import ImagesContainer from "@/app/components/OtherUserProfileScreen/ImagesContainer";

export default function OtherUserProfile() {

    const { width, height } = useWindowDimensions();
    const [styles, setStyles] = useState(createStyles(width, height));

    const { id } = useLocalSearchParams();

    const { token } = useAuthContext();

    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    useEffect(() => {
        setStyles(createStyles(width, height))
        console.log(width, height)
    }, [width, height]);

    useEffect(() => {
        async function fetchUserInfo() {
          if (!id) return;
          const response = await BackendCaller.getUserProfile(id, token);
          if (response?.statusCode === 200) {
            setUserInfo(response.data);
          }
        }
        fetchUserInfo();
      }, [id, token]);

    
    return (
        <View>
            {userInfo?.user ? (
            <ProfileCard user={userInfo?.user} postsQuantity={userInfo?.posts.length}/>
            ):(
                <Text>Something went wrong in card...</Text>
            )}
            {userInfo?.user && userInfo?.posts ? (
                <ImagesContainer
                    userAuthorPostsID={userInfo.user._id}
                    posts={userInfo.posts}
                />
                ) : (
                <Text>Something went wrong in images...</Text>
                )}
        </View>
    )
}

function createStyles(width: number, height: number) {

    const isLandscape = width > height;

    return StyleSheet.create({
        rootView: {
            flex: 1,
            backgroundColor: colors.background1Color,

            justifyContent: "center",
            alignItems: "center",

            width,
            height,

            paddingTop: Platform.OS === "android" ? 20 : 0,

            flexDirection: isLandscape ? "row" : "column",
        },
    });
}