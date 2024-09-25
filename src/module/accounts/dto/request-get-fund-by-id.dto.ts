import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class GetFundByIdRequestDTO {
    @ApiProperty({ description: 'The fund id of the fund', type: 'number' })
    @IsNumber()
    fund_id: number;
}