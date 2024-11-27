import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function PostsLayout() {
    return (
        <Stack screenOptions={{ headerShown: false}}>
            <Stack.Screen name="SpecificPostScreen/[postID]" />
        </Stack>
    );
}