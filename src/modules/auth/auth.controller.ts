import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  SignInDto,
  SignUpDto,
  VerifyEmailDto,
  ResetPasswordDto,
  ConfirmPasswordDto,
} from './dto/dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('test')
  test() {
    return 'working ...';
  }

  @Post('signin')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('verify-email')
  verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
    return this.authService.verifyEmail(verifyEmailDto);
  }

  @Post('resend-verification-code')
  resendVerificationCode(@Body('email') email: string) {
    return this.authService.resendVerificationCode(email);
  }

  @Post('reset-password')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @Post('confirm-password')
  confirmPassword(@Body() confirmPasswordDto: ConfirmPasswordDto) {
    return this.authService.confirmPassword(confirmPasswordDto);
  }
}
