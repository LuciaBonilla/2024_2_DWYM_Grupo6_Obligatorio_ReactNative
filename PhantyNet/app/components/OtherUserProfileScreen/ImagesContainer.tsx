import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import BACKEND_URI from "@/constants/BACKEND_URI";
import { useRouter } from "expo-router";
import { Post } from "@/constants/types";
import { useAuthContext } from "@/context-providers/AuthContextProvider";
import { colors } from "@/constants/colors";

type ImagesContainerProps = {
  userAuthorPostsID: string;
  posts: Post[];
};

const ImagesContainer: React.FC<ImagesContainerProps> = ({ userAuthorPostsID, posts }) => {
  const [postsSorted, setPostsSorted] = useState<Post[]>(sortPosts(posts));
  const router = useRouter();
  const { userID } = useAuthContext();

  function sortPosts(posts: Post[]): Post[] {
    return posts.sort((post1, post2) => new Date(post2.createdAt).getTime() - new Date(post1.createdAt).getTime());
  }

  function handleGoToOtherUserPostPage(postID: string) {
    //router.push(`/post/${postID}`);
  }

  function handleGoToMyPostPage(postID: string) {
    //router.push(`/my-posts/${postID}`);
  }

  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 10,
  },
  imageCard: {
    margin: 10,
    width: 100,
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
