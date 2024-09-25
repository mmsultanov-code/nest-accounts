import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateAccountDTO {
    @ApiProperty({ description: 'The user id of the account', type: 'number' })
    @IsNumber()
    user_id: number;
}