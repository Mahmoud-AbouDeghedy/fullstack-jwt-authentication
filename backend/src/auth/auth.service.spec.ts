import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;

  const mockUsersService = {
    findByEmail: jest.fn(),
    create: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(() => 'test-token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signup', () => {
    it('should throw if user exists', async () => {
      mockUsersService.findByEmail.mockResolvedValue({
        email: 'test@example.com',
      });

      await expect(
        service.signup({
          email: 'test@example.com',
          name: 'Test User',
          password: 'Password123!',
        }),
      ).rejects.toThrow(ConflictException);
    });

    it('should create a new user', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);
      mockUsersService.create.mockResolvedValue({
        _id: 'user-id',
        email: 'test@example.com',
        name: 'Test User',
        password: 'hashed-password',
      });

      const result = await service.signup({
        email: 'test@example.com',
        name: 'Test User',
        password: 'Password123!',
      });

      expect(result.user.email).toBe('test@example.com');
      expect(result.user.name).toBe('Test User');
    });
  });

  describe('signin', () => {
    it('should throw if user does not exist', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);

      await expect(
        service.signin({
          email: 'test@example.com',
          password: 'Password123!',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw if password is invalid', async () => {
      mockUsersService.findByEmail.mockResolvedValue({
        email: 'test@example.com',
        password: 'hashed-password',
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        service.signin({
          email: 'test@example.com',
          password: 'wrong-password',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should return a token if credentials are valid', async () => {
      mockUsersService.findByEmail.mockResolvedValue({
        _id: 'user-id',
        email: 'test@example.com',
        name: 'Test User',
        password: 'hashed-password',
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.signin({
        email: 'test@example.com',
        password: 'Password123!',
      });

      expect(result.access_token).toBe('test-token');
      expect(result.user.email).toBe('test@example.com');
    });
  });
});
