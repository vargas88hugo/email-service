import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserRepository } from '../repositories/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
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
