import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { useAuthContext } from '@/context-providers/AuthContextProvider';
import BackendCaller from '@/auxiliar-classes/BackendCaller';
import routes from "@/constants/routes";
import { Link, useNavigation } from "expo-router";
import { colors } from '@/constants/colors';

const MyProfileScreen = () => {
  const { userID, token } = useAuthContext(); // Obtenemos el ID y token desde el contexto de autenticación
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userID || !token) {
        console.log("UserID o Token no disponibles");
        return;
      }

      try {
        // Obtener el perfil del usuario
        const profileResponse = await BackendCaller.getUserProfile(userID, token);

        console.log("Perfil Response:", profileResponse);

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
      <View style={styles.profileHeader}>
        {/* Imagen de perfil */}
        <Image
          source={{ uri: profile.user.profilePicture || 'https://via.placeholder.com/100' }} 
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          {/* Nombre de usuario */}
          <Text style={styles.profileName}>{profile.user.username}</Text>

          {/* Contadores de publicaciones y amigos */}
          <View style={styles.statsContainer}>
            <View style={styles.statsItem}>
              <Text style={styles.statsNumber}>{profile.posts.length}</Text>
              <Text style={styles.statsLabel}>Publicaciones</Text>
            </View>
            <View style={styles.statsItem}>
              <Text style={styles.statsNumber}>{profile.user.friends.length}</Text>
              <Text style={styles.statsLabel}>Amigos</Text>
            </View>
          </View>

          {/* Descripción del usuario */}
          <Text style={styles.profileDescription}>{profile.user.description || 'Sin descripción'}</Text>
        </View>
      </View>

      {/* Botones */}
      <View style={styles.buttonsContainer}>
        <Link href={routes.MY_PROFILE_EDIT_ROUTE} style={styles.button}>
          <Text style={styles.buttonText}>Editar perfil</Text>
        </Link>
        <Link href={routes.LOGIN_ROUTE} style={styles.button}>
          <Text style={styles.buttonText}>Cerrar sesión</Text>
        </Link>
      </View>

      {/* Publicaciones */}
      <View style={styles.postsContainer}>
        {profile.posts && profile.posts.length > 0 ? (
          <FlatList
            data={profile.posts}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background1LighterColor,
  },
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
    textAlign: 'left', 
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center', 
    marginTop: 10,
    marginLeft:30,
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
    textAlign: 'left', 
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

export default MyProfileScreen;
