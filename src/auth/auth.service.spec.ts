import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: Partial<UsersService>;
  let jwtService: Partial<JwtService>;

  beforeEach(async () => {
    usersService = {
      findByEmail: jest.fn(),
      create: jest.fn().mockResolvedValue({ id: 1, email: 'test@test.com', role: 'VIEWER' }),
    };
    jwtService = {
      sign: jest.fn().mockReturnValue('mock-jwt-token'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('register', () => {
    it('should throw BadRequestException if email exists', async () => {
      (usersService.findByEmail as jest.Mock).mockResolvedValueOnce({});
      
      await expect(
        authService.register({ email: 'test@test.com', password: 'password', role: 'VIEWER' })
      ).rejects.toThrow(BadRequestException);
    });

    it('should successfully register a new user', async () => {
      (usersService.findByEmail as jest.Mock).mockResolvedValueOnce(null);
      
      const result = await authService.register({
        email: 'test@test.com',
        password: 'password',
        role: 'VIEWER',
      });

      expect(result).toEqual({ id: 1, email: 'test@test.com', role: 'VIEWER' });
      expect(usersService.create).toHaveBeenCalled();
    });
  });
});
