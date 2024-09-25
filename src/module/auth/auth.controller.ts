import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignInDTO } from './dto/sign-in.dto'
import { ResponseUserLoginDTO } from './dto/response-user-login.dto'
import { CreateUserDTO } from '../users/dto/create-user.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    /**
     * Signs in a user.
     *
     * @param {SignInDTO} SignInDTO - The sign-in data.
     * @returns {Promise<any>} - A promise that resolves with the result of the sign-in operation.
     */
    @ApiOperation({ summary: 'Sign in a user' })
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: HttpStatus.OK, type: ResponseUserLoginDTO })
    @Post('login')
    async sign_in(@Body() SignInDTO: SignInDTO): Promise<ResponseUserLoginDTO> {
        const response = await this.authService.sign_in(SignInDTO.email, SignInDTO.password)
        return new ResponseUserLoginDTO(response)
    }

    /**
     * Signs up a user.
     *
     * @param {CreateUserDTO} signUpDTO - The sign-up data.
     * @returns {Promise<any>} - A promise that resolves with the result of the sign-up operation.
     */
    @ApiOperation({ summary: 'Sign up a user' })
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({ status: HttpStatus.CREATED, type: ResponseUserLoginDTO })
    @Post('register')
    async sign_up(@Body() signUpDTO: CreateUserDTO): Promise<ResponseUserLoginDTO> {
        const response = await this.authService.sign_up(signUpDTO)
        return new ResponseUserLoginDTO(response)
    }
}
