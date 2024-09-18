import { Injectable } from '@nestjs/common';
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';
import {
  SignInDto,
  SignUpDto,
  VerifyEmailDto,
  ResetPasswordDto,
  ConfirmPasswordDto,
} from './dto/dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private userPool: CognitoUserPool;

  constructor(private readonly configService: ConfigService) {
    const poolData = {
      // UserPoolId: process.env.COGNITO_USER_POOL_ID,
      // ClientId: process.env.COGNITO_CLIENT_ID,
      UserPoolId: this.configService.get<string>('COGNITO_USER_POOL_ID'),
      ClientId: this.configService.get<string>('COGNITO_CLIENT_ID'),
    };
    this.userPool = new CognitoUserPool(poolData);
  }

  signIn({ email, password }: SignInDto) {
    return new Promise((resolve, reject) => {
      const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      });

      const userData = {
        Username: email,
        Pool: this.userPool,
      };

      const cognitoUser = new CognitoUser(userData);

      cognitoUser.authenticateUser(authDetails, {
        onSuccess: (result) => {
          resolve({
            accessToken: result.getAccessToken().getJwtToken(),
            refreshToken: result.getRefreshToken().getToken(),
            idToken: result.getIdToken().getJwtToken(),
          });
        },
        onFailure: (err) => {
          reject(err.message || JSON.stringify(err));
        },
      });
    });
  }

  signUp({ email, password }: SignUpDto) {
    const attributeList = [
      new CognitoUserAttribute({ Name: 'email', Value: email }),
    ];

    return new Promise((resolve, reject) => {
      this.userPool.signUp(
        email,
        password,
        attributeList,
        null,
        (err, result) => {
          if (err) {
            return reject(err.message || JSON.stringify(err));
          }
          resolve({ user: result.user });
        },
      );
    });
  }

  verifyEmail({ email, verificationCode }: VerifyEmailDto) {
    return new Promise((resolve, reject) => {
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: this.userPool,
      });

      cognitoUser.confirmRegistration(verificationCode, true, (err) => {
        if (err) {
          return reject(err.message || JSON.stringify(err));
        }
        resolve({ message: 'Email verified successfully' });
      });
    });
  }

  resendVerificationCode(email: string) {
    return new Promise((resolve, reject) => {
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: this.userPool,
      });

      cognitoUser.resendConfirmationCode((err, result) => {
        if (err) {
          return reject(err.message || JSON.stringify(err));
        }
        resolve(result);
      });
    });
  }

  resetPassword({ email }: ResetPasswordDto) {
    return new Promise((resolve, reject) => {
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: this.userPool,
      });

      cognitoUser.forgotPassword({
        onSuccess: (data) => {
          resolve({ message: 'Password reset code sent', data });
        },
        onFailure: (err) => {
          reject(err.message || JSON.stringify(err));
        },
      });
    });
  }

  confirmPassword({
    email,
    verificationCode,
    newPassword,
  }: ConfirmPasswordDto) {
    return new Promise((resolve, reject) => {
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: this.userPool,
      });

      cognitoUser.confirmPassword(verificationCode, newPassword, {
        onSuccess: () => {
          resolve({ message: 'Password has been reset successfully' });
        },
        onFailure: (err) => {
          reject(err.message || JSON.stringify(err));
        },
      });
    });
  }
}
