const LOGIN_ROUTE = "/modules/LoginScreen" as const;
const REGISTER_ROUTE = "/modules/RegisterScreen" as const;
const MY_FEED_ROUTE = "/modules/MyFeedScreen" as const;
const CREATE_POST_ROUTE = "/modules/CreatePostScreen" as const;
const MY_PROFILE_ROUTE = "/modules/MyProfileScreen" as const;
const MY_PROFILE_EDIT_ROUTE = "/modules/EditMyProfileScreen" as const;
const MY_POSTS_ROUTE = "/modules/MyPost/[id]" as const;
const OTHER_USER_PROFILE_ROUTE = "/modules/OtheUserProfile/[id]" as const;
const OTHER_USER_POST_ROUTE = "/modules/OtherUserPost/[id]" as const;

const routes = {
    LOGIN_ROUTE,
    REGISTER_ROUTE,
    MY_FEED_ROUTE,
    CREATE_POST_ROUTE,
    MY_PROFILE_ROUTE,
    MY_PROFILE_EDIT_ROUTE,
    MY_POSTS_ROUTE,
    OTHER_USER_PROFILE_ROUTE,
    OTHER_USER_POST_ROUTE,
};

export default routes;
