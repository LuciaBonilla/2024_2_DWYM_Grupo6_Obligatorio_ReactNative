import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";

// URI PARA IMAGENES POR URL
import BACKEND_URI from "@/constants/BACKEND_URI";

// TIPO QUE REPRESENTA POSTS
import { Post } from "@/constants/types";

// CONTEXTO PARA AUTENTICACIÓN
import { useAuthContext } from "@/context-providers/AuthContextProvider";

// COLORES PARA ESTILOS
import { colors } from "@/constants/colors";

// Tipado para entender los props recibidos desde OtherUserProfileScreen
type ImagesContainerProps = {
  userAuthorPostsID: string;
  posts: Post[];
};

/**
 * Listado de posts del Perfil, visibles mediante image buttons
 */
const ImagesContainer: React.FC<ImagesContainerProps> = ({ userAuthorPostsID, posts }) => {

  // posts ordenados por fecha de creación
  const [postsSorted, setPostsSorted] = useState<Post[]>(sortPosts(posts));

  // usado para navegación desde los image buttons
  const router = useRouter();

  // usado para autenticar
  const { userID } = useAuthContext();

  // función auxiliar para sortear los posts a mostrar
  function sortPosts(posts: Post[]): Post[] {
    return posts.sort((post1, post2) => new Date(post2.createdAt).getTime() - new Date(post1.createdAt).getTime());
  }

  // handler de los image buttons para ir al post representado
  function handleGoToOtherUserPostPage(postID: string) {
    // router.push(`/post/${postID}`);
  }

  // handler de los image buttons para ir al post representado
  function handleGoToMyPostPage(postID: string) {
    // router.push(`/my-posts/${postID}`);
  }

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.imagesWrapper}
        showsVerticalScrollIndicator={false} 
      >
        {postsSorted.length > 0 ? (
          postsSorted.map((post) => (
            <TouchableOpacity
              key={post._id}
              onPress={() =>
                userAuthorPostsID === userID
                  ? handleGoToMyPostPage(post._id)
                  : handleGoToOtherUserPostPage(post._id)
              }
              style={styles.imageCard}
            >
              <Image
                style={styles.image}
                source={{
                  uri: post.imageUrl ? `${BACKEND_URI}/${post.imageUrl.replace("\\", "/")}` : undefined,
                }}
              />
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noPostsMessage}>No hay posts de este usuario</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
  },
  imagesWrapper: {
    backgroundColor: colors.background1Color,
    borderRadius: 12,
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    overflow: "hidden",
  },
  imageCard: {
    width: "30%",
    margin: 5, 
    height: 100,
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  noPostsMessage: {
    fontSize: 16,
    color: colors.shadowColor,
    textAlign: "center",
  },
});

export default ImagesContainer;
