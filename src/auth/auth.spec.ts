import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtStrategy } from './jwt.strategy';
import { typeOrmConfigTest } from '../config/typeorm.configtest';
import { UserRepository } from './user.repository';

const mockUserRepository = () => ({});

describe('AuthService', () => {
  let userRepository: UserRepository;
  let authService: AuthService;
  let module: TestingModule;
  let user: AuthCredentialsDto;
  let jwtStrategy: JwtStrategy;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(typeOrmConfigTest),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secret: process.env.SECRET,
          signOptions: { expiresIn: 3600 },
        }),
        TypeOrmModule.forFeature([UserRepository]),
      ],
      providers: [AuthService, JwtStrategy],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
    authService = module.get<AuthService>(AuthService);
    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);

    user = {
      email: 'test@email.com',
      password: 'Password123',
    };
  });
  afterAll(() => jest.resetAllMocks());

  it('should create a new user', async () => {
    await expect(authService.signUp(user)).resolves.not.toThrow();
  });

  it('throws a conflic exception as username already exists', async () => {
    await expect(authService.signUp(user)).rejects.toThrow(ConflictException);
  });

  it('should signin a user', async () => {
    await expect(authService.signIn(user)).resolves.not.toThrow();
  });

  it('throws an unauthorized exception as password is wrong', async () => {
    await expect(
      authService.signIn({ email: user.email, password: 'wrongPassword' }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should return a user', async () => {
    await expect(
      jwtStrategy.validate({ userEmail: user.email }),
    ).resolves.not.toThrow();
  });

  it('throws an unauthorized exception from singin as user cannot be found', async () => {
    await expect(
      authService.signIn({ email: 'wrong@email.com', password: 'Password123' }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('throws an unauthorized exception from validate as user cannot be found', async () => {
    await expect(
      jwtStrategy.validate({ userEmail: 'wrong@email.com' }),
    ).rejects.toThrow(UnauthorizedException);
  });
});
