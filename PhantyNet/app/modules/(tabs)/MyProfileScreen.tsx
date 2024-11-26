import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useAuthContext } from '@/context-providers/AuthContextProvider';
import BackendCaller from '@/auxiliar-classes/BackendCaller';

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
  
        console.log("Perfil Response:", profileResponse); // Verifica si la respuesta está llegando correctamente
  
        if (profileResponse ) {
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
        {/* <Image
          source={{ uri: profile.user.profilePicture }} // Usamos la URL de la imagen del perfil
          style={styles.profileImage}
        /> */}
        {/* Nombre de usuario */}
        <Text style={styles.profileName}>{profile.user.username}</Text>
        {/* Descripción del usuario */}
        <Text style={styles.profileDescription}>{profile.user.email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  profileDescription: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 5,
  },
});

export default MyProfileScreen;
