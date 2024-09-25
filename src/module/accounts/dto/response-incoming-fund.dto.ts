import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class ResponseIncomingFundDTO {
    @ApiProperty({ description: 'The fund id of the fund', type: 'number' })
    @Expose()
    fund_id: number;
    @ApiProperty({ description: 'The account id of the fund', type: 'number' })
    @Expose()
    account_id: number;
    @ApiProperty({ description: 'The amount of the fund', type: 'number' })
    @Expose()
    amount: number;
    @ApiProperty({ description: 'The balance of the fund', type: 'number' })
    @Expose()
    balance: number;

    constructor(data: { fund_id: number; account_id: number; amount: number; balance: number }) {
        this.fund_id = data.fund_id;
        this.account_id = data.account_id;
        this.amount = data.amount;
        this.balance = data.balance;
    }
}