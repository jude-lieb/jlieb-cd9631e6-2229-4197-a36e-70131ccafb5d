import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from './users.service';

interface LoginRequest {
  username: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  async login(@Body() body: LoginRequest) {
    const { username, password } = body ?? {};
    if (!username || !password) {
      throw new HttpException('Username and password are required', HttpStatus.BAD_REQUEST);
    }

    const user = await this.usersService.validateCredentials(username, password);
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
}
