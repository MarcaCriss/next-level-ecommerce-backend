import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.getUserByEmail({ email });
    if (user && compare(password, user.password)) {
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }

  login(user: User) {
    const { id, ...rest } = user;
    const payload = { sub: id };

    const response = {
      user,
      accessToken: this.jwtService.sign(payload),
    };

    return response;
  }
}
