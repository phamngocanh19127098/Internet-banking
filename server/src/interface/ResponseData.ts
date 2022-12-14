import { User } from 'src/api/users/entity/user.entity';

export interface IToken {
  accessToken: string;
  expiresIn: string;
  refreshToken?: string;
  refreshExpiresIn?: string;
}

export interface IResponseData {
  data:
    | User
    | {
        user: User;
        accountNumber: any;
      };
  metadata?: IToken;
  statusCode: number;
  message: string;
}
