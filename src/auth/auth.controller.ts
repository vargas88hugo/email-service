import { Controller, ValidationPipe, Post, Body, Delete } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
  ApiBody,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { SignInCredentialsDto } from './dto/signin-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @ApiCreatedResponse({ description: 'User Signup' })
  @ApiBody({ type: AuthCredentialsDto })
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<string> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  @ApiCreatedResponse({ description: 'User Singin' })
  @ApiUnauthorizedResponse({ description: 'Invalid Credentials' })
  @ApiBody({ type: SignInCredentialsDto })
  signIn(
    @Body(ValidationPipe) signInCredentialsDto: SignInCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(signInCredentialsDto);
  }
}
