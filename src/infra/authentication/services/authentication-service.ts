export interface IAuthenticationService {
  getUser(id: string): Promise<any>;
  signUp(email: string, username: string, password: string): Promise<void>;
  signUpConfirm(username: string, confirmationCode: string): Promise<void>;
  signUpResendVerificationCode(username: string): Promise<void>;
  logIn(username: string, password: string): Promise<any>;
}
