export interface Token {
  accessToken: string;
  expiresIn: string;
  refreshToken?: string;
  refreshExpiresIn?: string;
}

export interface UsernameWithMetadata {
  username: string;
  metadata: Token;
}
