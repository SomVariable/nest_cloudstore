import { AuthService } from './auth.service';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}


    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiBody({type: CreateUserDto})
    async login( @Request() req){
        return this.authService.login(req.user as UserEntity);
    }

    @Post('/registration')
    register(@Body() dto: CreateUserDto) {
        return this.authService.register(dto)
    }
}
