export type Post = {
    _id: string;
    caption: string;
    comments: any[];
    createdAt: string;
    imageUrl: string;
    likes: any[];
    user: string;
  };
  
export type User = {
    _id: string;
    createdAt: string;
    description: string;
    email: string;
    friends: any[];
    notifications: any[];
    profilePicture: string;
    username: string;
  };
  
export type UserInfo = {
    posts: Post[];
    user: User;
  };