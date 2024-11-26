// ProfileHeader.tsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

interface ProfileHeaderProps {
  profileImage: string;
  username: string;
  description: string;
  postsCount: number;
  friendsCount: number;
}

const ProfileHeader = ({ profileImage, username, description, postsCount, friendsCount }: ProfileHeaderProps) => {
  return (
    <View style={styles.profileHeader}>
      {/* Imagen de perfil */}
      <Image source={{ uri: profileImage || 'https://via.placeholder.com/100' }} style={styles.profileImage} />
      <View style={styles.profileInfo}>
        {/* Nombre de usuario */}
        <Text style={styles.profileName}>{username}</Text>

        {/* Contadores de publicaciones y amigos */}
        <View style={styles.statsContainer}>
          <View style={styles.statsItem}>
            <Text style={styles.statsNumber}>{postsCount}</Text>
            <Text style={styles.statsLabel}>Publicaciones</Text>
          </View>
          <View style={styles.statsItem}>
            <Text style={styles.statsNumber}>{friendsCount}</Text>
            <Text style={styles.statsLabel}>Amigos</Text>
          </View>
        </View>

        {/* Descripción del usuario */}
        <Text style={styles.profileDescription}>{description || 'Sin descripción'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 15,
  },
  profileInfo: {
    alignItems: 'flex-start',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  statsItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  statsNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statsLabel: {
    fontSize: 14,
    color: '#888',
  },
  profileDescription: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
  },
});

export default ProfileHeader;
