import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

import { JwtPayload } from './interfaces/jwtPayload.interface';

/**
 * JWT Authentication Strategy
 *
 * Implements Passport JWT strategy for token-based authentication.
 * This strategy:
 * 1. Extracts JWT tokens from the Authorization header
 * 2. Verifies tokens using the configured secret
 * 3. Transforms the JWT payload into the user object for the request
 *
 * Used by the JwtAuthGuard to protect routes that require authentication.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger: Logger = new Logger(JwtStrategy.name);

  /**
   * Creates an instance of JwtStrategy
   *
   * @param configService - Config service to retrieve JWT settings
   * @throws Error if JWT_SECRET is not defined in environment variables
   */
  constructor(private readonly configService: ConfigService) {
    const jwtSecret: string | undefined =
      configService.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in the environment variables');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
    this.logger.log('JWT Strategy initialized');
  }

  /**
   * Validates and transforms the JWT payload into user information
   * This method is called by Passport after token verification
   *
   * @param payload - The decoded and verified JWT payload
   * @returns User information to be attached to the request object
   */
  validate(payload: JwtPayload): {
    userId: string;
    email: string;
  } {
    this.logger.debug(`Validating JWT payload for user: ${payload.email}`);
    return { userId: payload.id, email: payload.email };
  }
}
