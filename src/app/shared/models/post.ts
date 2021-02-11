export class Post {
  userName?: string;
  profileImage?: string;
  displayName: string;
  location: string;
  content: string;
  likeCount: number;
  commentCount: number;
  images?: Array<string>;
  timeStamp: number;
  tags?: Array<string>;
}
