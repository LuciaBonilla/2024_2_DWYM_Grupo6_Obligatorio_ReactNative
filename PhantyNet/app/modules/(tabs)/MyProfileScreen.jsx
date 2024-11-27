import { View, Text, Button } from 'react-native';
import routes from '@/constants/routes';
import { useRouter } from 'expo-router';


import routes from "@/constants/routes";

export default function MyProfileScreen() {
    
    const navigation = useRouter();
    
    const handlePressEditProfile = () => {
        navigation.push(routes.MY_PROFILE_EDIT_ROUTE);
      };
    
      return (
        <View>
          <Button title="Editar mi perfil" onPress={handlePressEditProfile} />
                <Link href={routes.LOGIN_ROUTE}>
                    Cerrar sesión
                </Link>
        </View>
      );
    };