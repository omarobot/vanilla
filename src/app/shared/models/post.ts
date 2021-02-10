export class Post {
  id: string;
  userName?: string;
  displayName: string;
  location: string;
  content: string;
  likesCount: number;
  commentsCount: number;
  pictures?: Array<string>;
  timeStamp: number;
  tags?: Array<string>;
}
