// MyProfileScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuthContext } from '@/context-providers/AuthContextProvider';
import BackendCaller from '@/auxiliar-classes/BackendCaller';
import { Link, useNavigation } from "expo-router";
import { colors } from '@/constants/colors';
import ProfileHeader from '@/app/components/MyProfileScreen/ProfileHeader';
import PostsSection from '@/app/components/MyProfileScreen/PostsSection';
import routes from '@/constants/routes';

const MyProfileScreen = () => {
  const { userID, token } = useAuthContext(); 
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userID || !token) {
        console.log("UserID o Token no disponibles");
        return;
      }

      try {
        const profileResponse = await BackendCaller.getUserProfile(userID, token);

        if (profileResponse) {
          setProfile(profileResponse.data); 
        } else {
          console.log("Error al obtener perfil:");
        }
      } catch (error) {
        console.error('Error al cargar el perfil:', error);
      }
    };

    fetchProfile();
  }, [userID, token]);

  if (!profile) {
    return <Text>Cargando...</Text>;
  }

  return (
    <View style={styles.container}>
      <ProfileHeader
        profileImage={profile.user.profilePicture}
        username={profile.user.username}
        description={profile.user.description}
        postsCount={profile.posts.length}
        friendsCount={profile.user.friends.length}
      />

      <View style={styles.buttonsContainer}>
        <Link href={routes.MY_PROFILE_EDIT_ROUTE} style={styles.button}>
          <Text style={styles.buttonText}>Editar perfil</Text>
        </Link>
        <Link href={routes.LOGIN_ROUTE} style={styles.button}>
          <Text style={styles.buttonText}>Cerrar sesión</Text>
        </Link>
      </View>

      <PostsSection posts={profile.posts} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background1LighterColor,
  },
  buttonsContainer: {
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    marginTop: 20,
  },
  button: {
    backgroundColor: colors.primaryColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginRight: 10, 
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default MyProfileScreen;
