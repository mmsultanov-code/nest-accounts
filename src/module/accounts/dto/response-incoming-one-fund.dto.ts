import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class ResponseIncomingOneFundDTO {
    @ApiProperty({ description: 'The fund id of the fund', type: 'number' })
    @Expose()
    fund_id: number;
    @ApiProperty({ description: 'The account id of the fund', type: 'number' })
    @Expose()
    account_id: number;
    @ApiProperty({ description: 'The amount of the fund', type: 'number' })
    @Expose()
    amount: number;

    constructor(data: { fund_id: number; account_id: number; amount: number; }) {
        this.fund_id = data.fund_id;
        this.account_id = data.account_id;
        this.amount = data.amount;
    }
}