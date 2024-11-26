import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// COMPONENTES.
import PostCardContainer from "@/app/components/shared/posts/PostCardContainer";

export default function MyFeedScreen() {
    return (
        <SafeAreaView style={{flex: 1}}>
            <Text>PhantyNet</Text>
            <PostCardContainer />
        </SafeAreaView>
    )
}