import { AuthService } from './auth.service';
import { Connection, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { typeOrmTest } from '../../config/typeormtest.config';
import { ConflictException, BadRequestException } from '@nestjs/common';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';

const mockUserRepository = () => ({});

describe('AuthService', () => {
  let db: Connection;
  let authService: AuthService;
  let userRepository: Repository<User>;
  let jwtService: JwtService;
  let user: AuthCredentialsDto;

  beforeAll(async () => {
    db = await typeOrmTest([User]);
    userRepository = db.getRepository(User);
    authService = new AuthService(userRepository, jwtService);
    user = {
      email: 'test@email.com',
      password: 'Password123',
    };
  });
  afterAll(() => db.close());

  it('should create a new user', async () => {
    await expect(authService.signUp(user)).resolves.not.toThrow();
  });

  it('throws a conflic exception as username already exists', async () => {
    await expect(authService.signUp(user)).rejects.toThrow(ConflictException);
  });
});
