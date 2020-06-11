import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserRepository } from '../repositories/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { User } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../dto/jwt-payload.interface';
import { SignInCredentialsDto } from '../dto/signin-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const user = await this.initializeEncryptUser(authCredentialsDto);
    const email = user.email;
    if (await this.userRepository.findOne({ email })) {
      throw new ConflictException(`User with email ${email} already exists.`);
    }
    user.save();
    return `New client with email ${email} has been created.`;
  }

  async signIn(
    signInCredentialsDto: SignInCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const userEmail = await this.validatePassword(signInCredentialsDto);
    if (!userEmail) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const payload: JwtPayload = { userEmail };
    console.log(payload, this.jwtService);
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  private async validatePassword(
    signInCredentialsDto: SignInCredentialsDto,
  ): Promise<string> {
    const { email, password } = signInCredentialsDto;
    const user = await this.userRepository.findOne({ email });
    const hash = await bcrypt.hash(password, user.salt);
    if (user && hash === user.password) {
      return user.email;
    } else {
      return null;
    }
  }

  private async initializeEncryptUser(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<User> {
    const { email, password } = authCredentialsDto;
    const user = new User();
    user.email = email;
    const { salt, encryptPassword } = await this.hashPassword(password);
    user.password = encryptPassword;
    user.salt = salt;
    return user;
  }

  private async hashPassword(
    password: string,
  ): Promise<{ salt: string; encryptPassword: string }> {
    const salt = await bcrypt.genSalt();
    const encryptPassword = await bcrypt.hash(password, salt);
    return { salt, encryptPassword };
  }
}
