import { AuthService } from './auth.service';
import { UserRepository } from '../repositories/user.repository';
import { Connection, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { typeOrmTest } from '../../config/typeormtest.config';
import { ConflictException } from '@nestjs/common';

let authService: AuthService;
let userRepository: UserRepository;
describe('AuthService', () => {
  let db: Connection;
  let authService: AuthService;
  let userRepository: Repository<User>;

  beforeAll(async () => {
    db = await typeOrmTest([User]);
    userRepository = db.getRepository(User);
    authService = new AuthService(userRepository);
  });
  afterAll(() => db.close());

  it('should create a new user', async () => {
    const email = 'test@email.com';
    const password = 'Password123';

    await expect(
      authService.signUp({ email, password }),
    ).resolves.not.toThrow();
  });

  it('throws a conflic exception as username already exists', async () => {
    const email = 'test@email.com';
    const password = 'Password123';

    await expect(authService.signUp({ email, password })).rejects.toThrow(
      ConflictException,
    );
  });
});
