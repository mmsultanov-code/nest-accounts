import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class IncomingFundRequestDTO {
    @ApiProperty({ description: 'The account id to be deposited into', type: 'number' })
    @IsNumber()
    account_id: number;
    
    @ApiProperty({ description: 'The amount to be deposited', type: 'number' })
    @IsNumber()
    amount: number;
}