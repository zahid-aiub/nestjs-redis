// signin.dto.ts
export class SignInDto {
  email: string;
  password: string;
}

// signup.dto.ts
export class SignUpDto {
  email: string;
  password: string;
}

// verify-email.dto.ts
export class VerifyEmailDto {
  email: string;
  verificationCode: string;
}

// reset-password.dto.ts
export class ResetPasswordDto {
  email: string;
}

// confirm-password.dto.ts
export class ConfirmPasswordDto {
  email: string;
  verificationCode: string;
  newPassword: string;
}
