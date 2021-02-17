import { Tag } from "./tag";

export class Post {
  postId?: string;
  userName?: string;
  uid: string;
  profileImage?: string;
  displayName: string;
  location: string;
  content: string;
  likeCount: number;
  commentCount: number;
  images?: Array<string>;
  timeStamp: number;
  tags?: Array<Tag>;
}
