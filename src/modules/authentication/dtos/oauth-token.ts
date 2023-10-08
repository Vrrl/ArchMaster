export interface IOAuthToken {
  accessToken: string;
  refreshToken: string;
  type?: string;
  expiresIn?: number;
}
