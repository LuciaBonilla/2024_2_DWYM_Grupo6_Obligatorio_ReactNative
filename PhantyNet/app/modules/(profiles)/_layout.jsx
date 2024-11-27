import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function ProfilesLayout() {
    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="EditMyProfileScreen"/>
            <Stack.Screen name="OtherUserProfileScreen/[userID]" />
        </Stack>
    );
}