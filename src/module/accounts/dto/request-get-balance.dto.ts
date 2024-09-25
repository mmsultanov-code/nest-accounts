import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class AccountBalanceRequestDTO {
    @ApiProperty({ description: 'The id of the account', type: 'number' })
    @IsNumber()
    account_id: number;
}