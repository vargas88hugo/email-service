import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserRepository } from '../repositories/user.repository';

const mockUserRepository = () => ({});

let authService: AuthService;
let userRepository: UserRepository;
describe('AuthService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserRepository, useFactory: mockUserRepository },
      ],
    }).compile();

    authService = await module.get<AuthService>(AuthService);
    userRepository = await module.get<UserRepository>(UserRepository);
  });
});
