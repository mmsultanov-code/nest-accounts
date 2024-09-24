import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class RegisterUserDTO {
    @ApiProperty({
        example: 'John',
        description: 'The first name of the user.'
    })
    @IsNotEmpty({ message: 'Please Enter Full Name' })
    @IsString({ message: 'Please Enter Valid Name' })
    first_name: string

    @ApiProperty({
        example: 'Doe',
        description: 'The last name of the user.'
    })
    @IsNotEmpty({ message: 'Please Enter Full Name' })
    @IsString({ message: 'Please Enter Valid Name' })
    last_name: string

    @ApiProperty({
        example: 'test@example.com',
        description: 'The email of the user.'
    })
    @IsEmail()
    email: string

    @ApiProperty({
        example: 'password',
        description: 'The password of the user.'
    })
    @IsNotEmpty({ message: 'Please Enter Password' })
    password: string
}
