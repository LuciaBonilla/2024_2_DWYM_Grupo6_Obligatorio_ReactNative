import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function PostsLayout() {
    return (
        <Stack>
            <Stack.Screen name="OtherUserPost/[id]" />
            <Stack.Screen name="MyPost/[id]" />
        </Stack>
    );
}