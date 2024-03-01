export interface ISignUpResult {
  user: CognitoUser;
  userConfirmed: boolean;
  userSub: string;
}

export class CognitoUser {
  constructor(data: ICognitoUserData);

  public setSignInUserSession(signInUserSession: CognitoUserSession): void;
  public getSignInUserSession(): CognitoUserSession | null;
  public getUsername(): string;

  public getAuthenticationFlowType(): string;
  public setAuthenticationFlowType(authenticationFlowType: string): string;

  public getSession(callback: Function): any;
  public refreshSession(refreshToken: CognitoRefreshToken, callback: NodeCallback<any, any>): void;
  public authenticateUser(authenticationDetails: AuthenticationDetails, callbacks: IAuthenticationCallback): void;
  public initiateAuth(authenticationDetails: AuthenticationDetails, callbacks: IAuthenticationCallback): void;
  public confirmRegistration(code: string, forceAliasCreation: boolean, callback: NodeCallback<any, any>): void;
  public sendCustomChallengeAnswer(answerChallenge: any, callback: IAuthenticationCallback): void;
  public resendConfirmationCode(callback: NodeCallback<Error, "SUCCESS">): void;
  public changePassword(oldPassword: string, newPassword: string, callback: NodeCallback<Error, "SUCCESS">): void;
  public forgotPassword(callbacks: {
    onSuccess: (data: any) => void;
    onFailure: (err: Error) => void;
    inputVerificationCode?: (data: any) => void;
  }): void;
  public confirmPassword(
    verificationCode: string,
    newPassword: string,
    callbacks: { onSuccess: () => void; onFailure: (err: Error) => void },
  ): void;
  public setDeviceStatusRemembered(callbacks: {
    onSuccess: (success: string) => void;
    onFailure: (err: any) => void;
  }): void;
  public setDeviceStatusNotRemembered(callbacks: {
    onSuccess: (success: string) => void;
    onFailure: (err: any) => void;
  }): void;
  public getDevice(callbacks: { onSuccess: (success: string) => void; onFailure: (err: Error) => void }): any;
  public forgetDevice(callbacks: { onSuccess: (success: string) => void; onFailure: (err: Error) => void }): void;
  public forgetSpecificDevice(
    deviceKey: string,
    callbacks: { onSuccess: (success: string) => void; onFailure: (err: Error) => void },
  ): void;
  public sendMFACode(
    confirmationCode: string,
    callbacks: { onSuccess: (session: CognitoUserSession) => void; onFailure: (err: any) => void },
    mfaType?: string,
  ): void;
  public listDevices(
    limit: number,
    paginationToken: string,
    callbacks: { onSuccess: (data: any) => void; onFailure: (err: Error) => void },
  ): void;
  public completeNewPasswordChallenge(
    newPassword: string,
    requiredAttributeData: any,
    callbacks: {
      onSuccess: (session: CognitoUserSession) => void;
      onFailure: (err: any) => void;
      mfaRequired?: (challengeName: any, challengeParameters: any) => void;
      customChallenge?: (challengeParameters: any) => void;
      mfaSetup?: (challengeName: any, challengeParameters: any) => void;
    },
  ): void;
  public signOut(): void;
  public globalSignOut(callbacks: { onSuccess: (msg: string) => void; onFailure: (err: Error) => void }): void;
  public verifyAttribute(
    attributeName: string,
    confirmationCode: string,
    callbacks: { onSuccess: (success: string) => void; onFailure: (err: Error) => void },
  ): void;
  public getUserAttributes(callback: NodeCallback<Error, CognitoUserAttribute[]>): void;
  public updateAttributes(attributes: ICognitoUserAttributeData[], callback: NodeCallback<Error, string>): void;
  public deleteAttributes(attributeList: string[], callback: NodeCallback<Error, string>): void;
  public getAttributeVerificationCode(
    name: string,
    callback: {
      onSuccess: () => void;
      onFailure: (err: Error) => void;
      inputVerificationCode?: (data: string) => void | null;
    },
  ): void;
  public deleteUser(callback: NodeCallback<Error, string>): void;
  public enableMFA(callback: NodeCallback<Error, string>): void;
  public disableMFA(callback: NodeCallback<Error, string>): void;
  public getMFAOptions(callback: NodeCallback<Error, MFAOption[]>): void;
  public getUserData(callback: NodeCallback<Error, UserData>): void;
  public associateSoftwareToken(callbacks: {
    associateSecretCode: (secretCode: string) => void;
    onFailure: (err: any) => void;
  }): void;
  public verifySoftwareToken(
    totpCode: string,
    friendlyDeviceName: string,
    callbacks: { onSuccess: (session: CognitoUserSession) => void; onFailure: (err: Error) => void },
  ): void;
  public setUserMfaPreference(
    smsMfaSettings: IMfaSettings,
    softwareTokenMfaSettings: IMfaSettings,
    callback: NodeCallback<Error, string>,
  ): void;
}
