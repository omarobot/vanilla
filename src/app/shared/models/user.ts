export interface User {
  uid: string;
  email: string;
  username?: string;
  photoURL: string;
  emailVerified: boolean;
  displayName?: string;
}
