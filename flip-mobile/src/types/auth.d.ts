export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  isConfigured: boolean;
  isVerified: boolean;
}

export interface ISignUpCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface IConfirmSignUpCredentials {
  username: string;
  code: string;
}

export interface ISignInCredentials {
  email: string;
  password: string;
}

export interface ICognitoAttributes {
  given_name: string;
  family_name: string;
  email: string;
  phone_number: string;
}

export interface IAuthState {
  user: IUser;
  isAuthPending: boolean;
  isVerifyCodePending: boolean;
  isSendCodePending: boolean;
  forgotPasswordStep: number;
}

export interface IAmplifyUser {
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  phone_number: string;
  phone_number_verified: boolean;
  sub: string;
}
