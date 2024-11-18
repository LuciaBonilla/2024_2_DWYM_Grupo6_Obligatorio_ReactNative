import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function ProfilesLayout() {
    return (
        <Stack>
            <Stack.Screen name="OtherUserProfile/[id]" />
            <Stack.Screen name="EditMyProfileScreen" />
        </Stack>
    );
}