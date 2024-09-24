import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class RegisterUserDTO {
    @IsNotEmpty({ message: 'Please Enter Full Name' })
    @IsString({ message: 'Please Enter Valid Name' })
    first_name: string

    @IsNotEmpty({ message: 'Please Enter Full Name' })
    @IsString({ message: 'Please Enter Valid Name' })
    last_name: string

    @IsEmail()
    email: string

    @IsNotEmpty({ message: 'Please Enter Password' })
    password: string
}
