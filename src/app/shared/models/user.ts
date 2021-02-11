export interface User {
  uid: string;
  email: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  photoURL?: string;
  emailVerified: boolean;
  displayName?: string;
  birthdate?: string;
}
