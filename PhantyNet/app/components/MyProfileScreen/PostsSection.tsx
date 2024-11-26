// PostsSection.tsx
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

interface PostsSectionProps {
  posts: string[];
}

const PostsSection = ({ posts }: PostsSectionProps) => {
  return (
    <View style={styles.postsContainer}>
      {posts && posts.length > 0 ? (
        <FlatList
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.postItem}>
              <Text>{item}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noPosts}>No tiene publicaciones.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  postsContainer: {
    marginTop: 20,
  },
  postItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  noPosts: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
  },
});

export default PostsSection;
