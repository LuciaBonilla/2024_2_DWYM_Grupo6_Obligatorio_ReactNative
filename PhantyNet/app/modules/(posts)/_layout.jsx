import { Stack } from 'expo-router';
import 'react-native-reanimated';

/**
 * Posts Layout.
 * @estado TERMINADO.
 */
export default function PostsLayout() {
    return (
        <Stack screenOptions={{ headerShown: false}}>
            <Stack.Screen name="SpecificPostScreen/[postID]" />
        </Stack>
    );
}