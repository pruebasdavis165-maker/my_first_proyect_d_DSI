import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión y obtener token JWT' })
  @ApiResponse({ status: 201, description: 'Token JWT generado exitosamente.' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas.' })
  async login(@Body() data: LoginDto) {
    const usertoken = await this.authService.validateUser(data);

    if (!usertoken) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return usertoken;
  }
}