import { ForbiddenException, Injectable } from '@nestjs/common';
import {JwtService} from '@nestjs/jwt'
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UserService, private jwtService: JwtService){}

    async validateUser(email: string, password: string): Promise<any>{
        const user = await this.usersService.findByEmail(email);
        
        if(user && user.password === password){
            const {password, ...result} = user;
            return result
        }

        return null;
    }

    async register(dto: CreateUserDto){
        try {
            const userData = await this.usersService.create(dto);

            return {
                token: this.jwtService.sign({ id: userData.id})
            };
        } catch (error) {
            console.log(error);
            throw new ForbiddenException( 'RegistrationError' )

        }
    }

    async login(user: UserEntity){
        return {
            token: this.jwtService.sign({id: user.id})
        }
    }
}
