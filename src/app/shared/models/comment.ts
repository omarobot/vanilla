export class Comment {
  postId: string;
  commentId?: string;
  userName?: string;
  uid: string;
  profileImage?: string;
  displayName: string;
  content: string;
  likeCount: number;
  images?: Array<string>;
  timeStamp: number;
  userLikes?: Array<string>;
}
